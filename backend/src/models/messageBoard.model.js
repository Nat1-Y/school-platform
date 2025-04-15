const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Student = require('./student.model');

const MessageBoard = sequelize.define('MessageBoard', {
  message_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  message_text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  recipient_role: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['admin', 'teacher', 'parent', 'student', 'all']]
    }
  },
  sender_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'user_id'
    }
  },
  student_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: 'student_id'
    }
  }
}, {
  tableName: 'message_board',
  timestamps: true,
  createdAt: 'posted_at',
  updatedAt: false
});

Student.hasMany(MessageBoard, { foreignKey: 'student_id' });
MessageBoard.belongsTo(Student, { foreignKey: 'student_id' });

module.exports = MessageBoard;