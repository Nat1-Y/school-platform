const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Class = require('./class.model');
const Semester = require('./semester.model');

const Report = sequelize.define('Report', {
  report_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  report_type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  file_path: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  created_by: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
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
  semester_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Semester,
      key: 'semester_id'
    }
  }
}, {
  tableName: 'reports',
  timestamps: true,
  createdAt: 'generated_at',
  updatedAt: false
});

Class.hasMany(Report, { foreignKey: 'class_id' });
Report.belongsTo(Class, { foreignKey: 'class_id' });
Semester.hasMany(Report, { foreignKey: 'semester_id' });
Report.belongsTo(Semester, { foreignKey: 'semester_id' });

module.exports = Report;