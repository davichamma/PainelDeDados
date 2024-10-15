// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Role = require('./Role');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.belongsTo(Role);

module.exports = User;
