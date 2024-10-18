// db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize('PainelDeDadosSESIHMG', username, password, {
  host: 'srv-sgbddevhom', // Change this if your DB is hosted elsewhere
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true, // Use this if you're connecting to Azure SQL, otherwise set it to false if not needed
      enableArithAbort: true, // Helps to prevent arithmetic exceptions in SQL Server
    },
  },
  logging: console.log, // Logs every SQL query (can help in debugging)
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
