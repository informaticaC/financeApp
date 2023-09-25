const {DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Expense = sequelize.define('expenses', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment_date: {
    type: DataTypes.DATEONLY, 
    allowNull: false,
  },
});

module.exports = Expense;
