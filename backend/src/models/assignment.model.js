const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Teacher = require('./teacher.model');
const Class = require('./class.model');
const Subject = require('./subject.model');
const Semester = require('./semester.model');

const Assignment = sequelize.define('Assignment', {
  assignment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  file_path: {
    type: DataTypes.STRING(255)
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Teacher,
      key: 'teacher_id'
    }
  },
  class_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Class,
      key: 'class_id'
    }
  },
  subject_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Subject,
      key: 'subject_id'
    }
  },
  semester_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Semester,
      key: 'semester_id'
    }
  }
}, {
  tableName: 'assignments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

Teacher.hasMany(Assignment, { foreignKey: 'teacher_id' });
Assignment.belongsTo(Teacher, { foreignKey: 'teacher_id' });
Class.hasMany(Assignment, { foreignKey: 'class_id' });
Assignment.belongsTo(Class, { foreignKey: 'class_id' });
Subject.hasMany(Assignment, { foreignKey: 'subject_id' });
Assignment.belongsTo(Subject, { foreignKey: 'subject_id' });
Semester.hasMany(Assignment, { foreignKey: 'semester_id' });
Assignment.belongsTo(Semester, { foreignKey: 'semester_id' });

module.exports = Assignment;