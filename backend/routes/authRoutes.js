// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

const router = express.Router();
const secretKey = 'your-secret-key';

// Login Route
router.post('/login', async (req, res) => {
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
router.post('/register', async (req, res) => {
  const { username, password, roleId } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ username, password: hashedPassword, roleId });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to register user' });
  }
});

module.exports = router;