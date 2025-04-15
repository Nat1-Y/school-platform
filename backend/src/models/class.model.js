const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Class = sequelize.define('Class', {
  class_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  class_name: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'classes',
  timestamps: false
});

module.exports = Class;