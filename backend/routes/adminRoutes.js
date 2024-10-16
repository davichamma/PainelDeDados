// routes/adminRoutes.js
const express = require('express');
const { User, Report, Role } = require('../models');
const { authenticateJWT, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin: Assign reports to users
router.post('/assign-reports', [authenticateJWT, authorizeRole(['admin'])], async (req, res) => {
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

// Admin: Create or Update Reports
router.post('/reports', [authenticateJWT, authorizeRole(['admin'])], async (req, res) => {
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
router.post('/assignRoleToReport', [authenticateJWT, authorizeRole(['admin'])], async (req, res) => {
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

module.exports = router;
