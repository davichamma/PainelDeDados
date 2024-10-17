// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

const router = express.Router();
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;


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

// Login or Register Route (for AAD authentication)
router.post('/loginOrRegister', async (req, res) => {
  const { username } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ where: { username }, include: [Role] });

    if (user) {
      // User already exists, return success
      const token = jwt.sign({ id: user.id, role: user.role.roleName }, secretKey);
      return res.status(200).json({ message: 'User exists', token });
    } else {
      // Register the user if they don't exist
      const newUser = await User.create({ username, roleId: 2 }); // Assign default role
      const token = jwt.sign({ id: newUser.id, role: 'Analyst' }, secretKey);
      return res.status(201).json({ message: 'User created', token });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to register or verify user' });
  }
});


module.exports = router;