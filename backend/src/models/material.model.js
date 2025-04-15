const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Teacher = require('./teacher.model');
const Class = require('./class.model');
const Subject = require('./subject.model');
const Semester = require('./semester.model');

const Material = sequelize.define('Material', {
  material_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  file_path: {
    type: DataTypes.STRING(255),
    allowNull: false
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
  tableName: 'materials',
  timestamps: true,
  createdAt: 'uploaded_at',
  updatedAt: false
});

Teacher.hasMany(Material, { foreignKey: 'teacher_id' });
Material.belongsTo(Teacher, { foreignKey: 'teacher_id' });
Class.hasMany(Material, { foreignKey: 'class_id' });
Material.belongsTo(Class, { foreignKey: 'class_id' });
Subject.hasMany(Material, { foreignKey: 'subject_id' });
Material.belongsTo(Subject, { foreignKey: 'subject_id' });
Semester.hasMany(Material, { foreignKey: 'semester_id' });
Material.belongsTo(Semester, { foreignKey: 'semester_id' });

module.exports = Material;