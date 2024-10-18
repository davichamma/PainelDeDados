// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username }, include: [Role] });
    if (!user) return res.status(400).send('User not found');

    const token = jwt.sign({ id: user.id, role: user.role.roleName }, secretKey);
    res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Register Route
router.post('/register', async (req, res) => {
  const { username, roleId } = req.body;

  try {
    const newUser = await User.create({ username, roleId });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to register user' });
  }
});

// Login or Register Route (for AAD authentication)
router.post('/loginOrRegister', async (req, res) => {
  console.log("Fetching user information...");
  const { username, password } = req.body;

  try {
    console.log("Checking if user exists in the database...");

    // Check if the user already exists
    let user = await User.findOne({ 
      where: { username },
      include: [{ model: Role, as: 'role' }] // Include with alias 'role'
    });

    if (user) {
      console.log("User found in database.");
      const token = jwt.sign({ id: user.id, role: user.role.roleName }, secretKey);
      return res.status(200).json({ message: 'User exists', token });
    } else {
      console.log("User not found, creating new user...");
      const newUser = await User.create({ username, password: password, roleId: 4 }); // Assign default role
      console.log("New user created successfully. User:", newUser);
      const token = jwt.sign({ id: newUser.id, role: 'Telemarketing' }, secretKey);
      return res.status(201).json({ message: 'User created', token });
    }
  } catch (error) {
    console.error('Failed to register or verify user:', error); // Log the actual error details
    return res.status(500).json({ error: 'Failed to register or verify user', details: error.message });
  }
});

// Check if User Exists Route
router.get('/checkUser', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'User exists', user });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to check user' });
  }
});

router.get('/test-db-connection', async (req, res) => {
  try {
    const users = await User.findAll();
    if (users.length === 0) {
      console.log('No users found in the database');
      res.status(200).json({
        message: 'Connection to the database is successful, but no users found.',
        users: [],
      });
    } else {
      res.status(200).json({
        message: 'Connection to the database is successful',
        users: users,
      });
    }
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ message: 'Failed to connect to the database', error: error.message });
  }
});

router.post('/test-insert-user', async (req, res) => {
  try {
    const newUser = await User.create({
      username: 'testuser',
      roleId: 4, // Assuming roleId `4` exists in `Roles` table for testing purposes
    });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Failed to insert user:', error);
    res.status(500).json({ message: 'Failed to insert user', error: error.message });
  }
});

module.exports = router;