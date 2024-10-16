// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../db');

const Group = require('./Group')(sequelize, Sequelize.DataTypes);
const Report = require('./Report')(sequelize, Sequelize.DataTypes);
const Role = require('./Role')(sequelize, Sequelize.DataTypes);
const User = require('./User')(sequelize, Sequelize.DataTypes);

// Definindo as associações
Group.associate({ Report });
Report.associate({ Group });
Role.associate({ User });
User.associate({ Role });

sequelize.sync(); // Sync all models with the database

module.exports = { Group, Report, Role, User, sequelize };
