const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Class = require('./class.model');
const Teacher = require('./teacher.model');
const Subject = require('./subject.model');
const Semester = require('./semester.model');

const Schedule = sequelize.define('Schedule', {
  schedule_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  day_of_week: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  period_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false
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
  },
  semester_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Semester,
      key: 'semester_id'
    }
  },
  created_by: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'user_id'
    }
  }
}, {
  tableName: 'schedules',
  timestamps: false
});

Class.hasMany(Schedule, { foreignKey: 'class_id' });
Schedule.belongsTo(Class, { foreignKey: 'class_id' });
Teacher.hasMany(Schedule, { foreignKey: 'teacher_id' });
Schedule.belongsTo(Teacher, { foreignKey: 'teacher_id' });
Subject.hasMany(Schedule, { foreignKey: 'subject_id' });
Schedule.belongsTo(Subject, { foreignKey: 'subject_id' });
Semester.hasMany(Schedule, { foreignKey: 'semester_id' });
Schedule.belongsTo(Semester, { foreignKey: 'semester_id' });

module.exports = Schedule;