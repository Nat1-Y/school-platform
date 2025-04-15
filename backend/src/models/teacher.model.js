const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user.model');

const Teacher = sequelize.define('Teacher', {
  teacher_id: {
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
  subject_teaches: {
    type: DataTypes.STRING(50)
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  }
}, {
  tableName: 'teachers',
  timestamps: false
});

User.hasOne(Teacher, { foreignKey: 'user_id' });
Teacher.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Teacher;