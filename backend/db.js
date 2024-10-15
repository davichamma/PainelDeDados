// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost', // Change this if your DB is hosted elsewhere
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true, // Use this if you're connecting to Azure SQL
    },
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to SQL Server has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connectDB();

module.exports = sequelize;
