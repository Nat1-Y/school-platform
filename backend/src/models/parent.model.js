const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user.model');

const Parent = sequelize.define('Parent', {
  parent_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING(20)
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  }
}, {
  tableName: 'parents',
  timestamps: false
});

User.hasOne(Parent, { foreignKey: 'user_id' });
Parent.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Parent;