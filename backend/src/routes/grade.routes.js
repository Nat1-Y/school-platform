const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { 
  addGrade, 
  getStudentGrades, 
  getClassGrades, 
  updateGrade 
} = require('../controllers/grade.controller');

router.post('/', authenticate, authorize('teacher'), addGrade);
router.get('/student', authenticate, getStudentGrades);
router.get('/class', authenticate, getClassGrades);
router.patch('/:grade_id', authenticate, authorize('teacher'), updateGrade);

module.exports = router;