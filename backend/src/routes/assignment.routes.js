const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { 
  createAssignment, 
  getClassAssignments, 
  getAssignmentDetails,
  submitAssignment,
  gradeAssignment,
  getAssignmentSubmissions
} = require('../controllers/assignment.controller');

router.post('/', authenticate, authorize('teacher'), createAssignment);
router.get('/', authenticate, getClassAssignments);
router.get('/:assignment_id', authenticate, getAssignmentDetails);
router.post('/:assignment_id/submit', authenticate, authorize('student'), submitAssignment);
router.patch('/submissions/:submission_id', authenticate, authorize('teacher'), gradeAssignment);
router.get('/:assignment_id/submissions', authenticate, getAssignmentSubmissions);

module.exports = router;