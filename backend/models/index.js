// models/index.js
const User = require('./User');
const Report = require('./Report');
const Role = require('./Role');
const sequelize = require('../db');

// Associations
User.belongsTo(Role); // Each user has one role
User.belongsToMany(Report, { through: 'UserReports' }); // Many-to-many between users and reports
Report.belongsToMany(User, { through: 'UserReports' });

sequelize.sync(); // Sync all models with the database

module.exports = { User, Report, Role };
