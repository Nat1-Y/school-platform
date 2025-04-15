const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { 
  markAttendance, 
  getClassAttendance, 
  getStudentAttendance, 
  updateAttendance 
} = require('../controllers/attendance.controller');

router.post('/', authenticate, authorize('teacher'), markAttendance);
router.get('/class', authenticate, getClassAttendance);
router.get('/student', authenticate, getStudentAttendance);
router.patch('/:attendance_id', authenticate, authorize('teacher'), updateAttendance);

module.exports = router;