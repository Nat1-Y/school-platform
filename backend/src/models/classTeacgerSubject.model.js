const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Class = require('./class.model');
const Teacher = require('./teacher.model');
const Subject = require('./subject.model');

const ClassTeacherSubject = sequelize.define('ClassTeacherSubject', {
  cts_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  class_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Class,
      key: 'class_id'
    }
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Teacher,
      key: 'teacher_id'
    }
  },
  subject_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Subject,
      key: 'subject_id'
    }
  }
}, {
  tableName: 'class_teacher_subject',
  timestamps: false
});

Class.belongsToMany(Teacher, { through: ClassTeacherSubject, foreignKey: 'class_id' });
Teacher.belongsToMany(Class, { through: ClassTeacherSubject, foreignKey: 'teacher_id' });
Subject.belongsToMany(ClassTeacherSubject, { through: ClassTeacherSubject, foreignKey: 'subject_id' });

module.exports = ClassTeacherSubject;