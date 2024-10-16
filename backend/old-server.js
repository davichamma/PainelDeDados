// server.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { User, Report, Role } = require('./models');

const app = express();
const PORT = 5000;
const secretKey = 'your-secret-key';

// Middleware
app.use(express.json());
app.use(cors());

// Helper function to authenticate users using JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).send('Access denied. No token provided.');

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};

// Helper function to authorize based on role
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).send('Access denied. You do not have the right permissions.');
    }
    next();
  };
};

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username }, include: [Role] });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid password');

    const token = jwt.sign({ id: user.id, role: user.role.roleName }, secretKey);
    res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Register Route
app.post('/register', async (req, res) => {
  const { username, password, roleId } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ username, password: hashedPassword, roleId });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to register user' });
  }
});

// Admin: Assign reports to users
app.post('/admin/assign-reports', [authenticateJWT, authorizeRole(['admin'])], async (req, res) => {
  const { userId, reportIds } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(400).send('User not found');

    const reports = await Report.findAll({ where: { id: reportIds } });
    await user.setReports(reports);
    res.send('Reports assigned successfully');
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign reports' });
  }
});

// Get Reports by Role
app.get('/reports', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [Role],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the user's role
    const userRole = user.role;

    // Find reports that the user's role is allowed to view
    const reports = await Report.findAll({
      include: {
        model: Role,
        where: { id: userRole.id },
      },
    });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// Admin: Create or Update Reports
app.post('/admin/reports', [authenticateJWT, authorizeRole(['admin'])], async (req, res) => {
  const { id, title, url, icon } = req.body;
  try {
    let report;
    if (id) {
      report = await Report.findByPk(id);
      if (report) {
        report.title = title;
        report.url = url;
        report.icon = icon;
        await report.save();
      } else {
        return res.status(404).json({ error: 'Report not found' });
      }
    } else {
      report = await Report.create({ title, url, icon });
    }
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ error: 'Error creating/updating report' });
  }
});

// Assign Role to Report (Admin functionality)
app.post('/admin/assignRoleToReport', [authenticateJWT, authorizeRole(['admin'])], async (req, res) => {
  const { reportId, roleId } = req.body;

  try {
    const report = await Report.findByPk(reportId);
    const role = await Role.findByPk(roleId);

    if (!report || !role) {
      return res.status(404).json({ error: 'Report or Role not found' });
    }

    await report.addRole(role);
    res.json({ message: 'Role assigned to report successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign role to report' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});