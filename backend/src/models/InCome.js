const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const InCome = sequelize.define('income', {
    name: {
      type:DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  
  });
  
  module.exports = InCome;