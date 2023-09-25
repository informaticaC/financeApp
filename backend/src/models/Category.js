const {DataTypes } = require('sequelize');
const sequelize = require('../utils/connection'); // Ajusta la ruta según tu estructura de carpetas

const Category = sequelize.define('category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type:DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.BOOLEAN, // Utiliza BOOLEAN si es una categoría de ingresos o gastos
    allowNull: false,
  },
});

module.exports = Category;
