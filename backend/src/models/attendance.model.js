const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Student = require('./student.model');
const Class = require('./class.model');
const Teacher = require('./teacher.model');
const Subject = require('./subject.model');
const Semester = require('./semester.model');

const Attendance = sequelize.define('Attendance', {
  attendance_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  period_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['present', 'absent', 'late', 'excused']]
    }
  },
  student_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: 'student_id'
    }
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
  }
}, {
  tableName: 'attendance',
  timestamps: false
});

Student.hasMany(Attendance, { foreignKey: 'student_id' });
Attendance.belongsTo(Student, { foreignKey: 'student_id' });
Class.hasMany(Attendance, { foreignKey: 'class_id' });
Attendance.belongsTo(Class, { foreignKey: 'class_id' });
Teacher.hasMany(Attendance, { foreignKey: 'teacher_id' });
Attendance.belongsTo(Teacher, { foreignKey: 'teacher_id' });
Subject.hasMany(Attendance, { foreignKey: 'subject_id' });
Attendance.belongsTo(Subject, { foreignKey: 'subject_id' });
Semester.hasMany(Attendance, { foreignKey: 'semester_id' });
Attendance.belongsTo(Semester, { foreignKey: 'semester_id' });

module.exports = Attendance;