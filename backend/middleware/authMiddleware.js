// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

// Middleware function to authenticate JWT tokens
const authenticateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).send('Access denied. No token provided.');
  }

  // Remove "Bearer " from the header if it exists
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    // Verify the JWT token with the secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Attach decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = authenticateJWT;
