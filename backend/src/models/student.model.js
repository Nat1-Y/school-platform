const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user.model');
const Class = require('./class.model');
const Parent = require('./parent.model');

const Student = sequelize.define('Student', {
  student_id: {
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
  date_of_birth: {
    type: DataTypes.DATE
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  class_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Class,
      key: 'class_id'
    }
  },
  parent_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Parent,
      key: 'parent_id'
    }
  }
}, {
  tableName: 'students',
  timestamps: false
});

User.hasOne(Student, { foreignKey: 'user_id' });
Student.belongsTo(User, { foreignKey: 'user_id' });
Class.hasMany(Student, { foreignKey: 'class_id' });
Student.belongsTo(Class, { foreignKey: 'class_id' });
Parent.hasMany(Student, { foreignKey: 'parent_id' });
Student.belongsTo(Parent, { foreignKey: 'parent_id' });

module.exports = Student;