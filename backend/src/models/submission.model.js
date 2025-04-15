const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Student = require('./student.model');
const Assignment = require('./assignment.model');

const Submission = sequelize.define('Submission', {
  submission_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  submitted_file_path: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  grade: {
    type: DataTypes.DECIMAL(4, 2),
    validate: {
      min: 0,
      max: 100
    }
  },
  feedback: {
    type: DataTypes.TEXT
  },
  student_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: 'student_id'
    }
  },
  assignment_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Assignment,
      key: 'assignment_id'
    }
  }
}, {
  tableName: 'submissions',
  timestamps: true,
  createdAt: 'submission_date',
  updatedAt: false
});

Student.hasMany(Submission, { foreignKey: 'student_id' });
Submission.belongsTo(Student, { foreignKey: 'student_id' });
Assignment.hasMany(Submission, { foreignKey: 'assignment_id' });
Submission.belongsTo(Assignment, { foreignKey: 'assignment_id' });

module.exports = Submission;