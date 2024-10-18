// backend/middleware/roleMiddleware.js
const authorizeRole = (roles) => {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).send('Access denied. You do not have the right permissions.');
      }
      next();
    };
  };
  
  module.exports = authorizeRole;
  