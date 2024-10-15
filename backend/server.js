// server.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { User, Report } = require('./models');

const app = express();
const PORT = 5000;
const secretKey = 'your-secret-key';

// Middleware
app.use(express.json());
app.use(cors());

// Helper function to authenticate users using JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user) return res.status(400).send('User not found');
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid password');

  const token = jwt.sign({ id: user.id }, secretKey);
  res.json({ token });
});

// Admin: Assign reports to users
app.post('/admin/assign-reports', authenticateJWT, async (req, res) => {
  const { userId, reportIds } = req.body;
  const user = await User.findByPk(userId);
  
  if (!user) return res.status(400).send('User not found');

  const reports = await Report.findAll({
    where: { id: reportIds }
  });

  await user.setReports(reports);
  res.send('Reports assigned successfully');
});

// server.js
app.get('/reports', authenticateJWT, async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        include: [Role],
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Get the user's role
      const userRole = user.Role;
  
      // Find reports that the user's role is allowed to view
      const reports = await PowerBIReport.findAll({
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
  
  


// server.js (part of the admin routes)

// Admin: Create or Update Reports (including icon)
app.post('/admin/reports', authenticateJWT, async (req, res) => {
    const { title, url, icon } = req.body;
    try {
      const report = await Report.create({ title, url, icon });
      res.status(201).json(report);
    } catch (error) {
      res.status(400).json({ error: 'Error creating report' });
    }
  });
  

  // server.js
app.post('/register', async (req, res) => {
    const { username, password, roleId } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, password: hashedPassword, RoleId: roleId });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: 'Failed to register user' });
    }
  });


  // Assign role to report (Admin functionality)
app.post('/admin/assignRoleToReport', authenticateJWT, async (req, res) => {
    const { reportId, roleId } = req.body;
  
    try {
      const report = await PowerBIReport.findByPk(reportId);
      const role = await Role.findByPk(roleId);
  
      if (!report || !role) {
        return res.status(404).json({ error: 'Report or Role not found' });
      }
  
      // Associate the role with the report
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
