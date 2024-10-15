// models/Report.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Role = require('./Role'); // Import Role model

const Report = sequelize.define('Report', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Reports can be viewed by many roles
Report.belongsToMany(Role, { through: 'ReportRoles' });
Role.belongsToMany(Report, { through: 'ReportRoles' });

module.exports = Report;
