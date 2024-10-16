// routes/reportRoutes.js
const express = require('express');
const { Report, Role, User } = require('../models');
const { authenticateJWT } = require('../middleware/authMiddleware');

const router = express.Router();

// Get Reports by Role
router.get('/', authenticateJWT, async (req, res) => {
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

module.exports = router;