const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Student = require('./student.model');
const Teacher = require('./teacher.model');
const Subject = require('./subject.model');
const Semester = require('./semester.model');

const Grade = sequelize.define('Grade', {
  grade_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  grade: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  },
  comments: {
    type: DataTypes.TEXT
  },
  student_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: 'student_id'
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
  tableName: 'grades',
  timestamps: false
});

Student.hasMany(Grade, { foreignKey: 'student_id' });
Grade.belongsTo(Student, { foreignKey: 'student_id' });
Teacher.hasMany(Grade, { foreignKey: 'teacher_id' });
Grade.belongsTo(Teacher, { foreignKey: 'teacher_id' });
Subject.hasMany(Grade, { foreignKey: 'subject_id' });
Grade.belongsTo(Subject, { foreignKey: 'subject_id' });
Semester.hasMany(Grade, { foreignKey: 'semester_id' });
Grade.belongsTo(Semester, { foreignKey: 'semester_id' });

module.exports = Grade;