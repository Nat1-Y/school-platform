const { Assignment } = require('../models/assignment.model');
const { Submission } = require('../models/submission.model');
const { Student } = require('../models/student.model');
const { Class } = require('../models/class.model');
const { Subject } = require('../models/subject.model');
const { Semester } = require('../models/semester.model');

const createAssignment = async (req, res) => {
  try {
    const { class_id, subject_id, semester_id, title, description, due_date, file_path } = req.body;
    const teacher_id = req.user.teacher_id;

    const assignment = await Assignment.create({
      teacher_id,
      class_id,
      subject_id,
      semester_id,
      title,
      description,
      due_date,
      file_path
    });

    res.status(201).send(assignment);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getClassAssignments = async (req, res) => {
  try {
    const { class_id, subject_id, semester_id } = req.query;
    
    const assignments = await Assignment.findAll({
      where: { class_id, subject_id, semester_id },
      include: [
        { model: Subject, attributes: ['subject_name'] },
        { model: Teacher, attributes: ['first_name', 'last_name'] }
      ],
      order: [['due_date', 'ASC']]
    });

    res.send(assignments);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};

const getAssignmentDetails = async (req, res) => {
  try {
    const { assignment_id } = req.params;
    
    const assignment = await Assignment.findByPk(assignment_id, {
      include: [
        { model: Subject, attributes: ['subject_name'] },
        { model: Teacher, attributes: ['first_name', 'last_name'] },
        { model: Class, attributes: ['class_name'] }
      ]
    });

    if (!assignment) {
      return res.status(404).send({ error: 'Assignment not found' });
    }

    res.send(assignment);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};

const submitAssignment = async (req, res) => {
  try {
    const { assignment_id } = req.params;
    const { submitted_file_path } = req.body;
    const student_id = req.user.student_id;

    const submission = await Submission.create({
      student_id,
      assignment_id,
      submitted_file_path
    });

    res.status(201).send(submission);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const gradeAssignment = async (req, res) => {
  try {
    const { submission_id } = req.params;
    const { grade, feedback } = req.body;

    const submission = await Submission.findByPk(submission_id);
    if (!submission) {
      return res.status(404).send({ error: 'Submission not found' });
    }

    submission.grade = grade;
    submission.feedback = feedback;
    await submission.save();

    res.send(submission);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAssignmentSubmissions = async (req, res) => {
  try {
    const { assignment_id } = req.params;
    
    const submissions = await Submission.findAll({
      where: { assignment_id },
      include: [
        { model: Student, attributes: ['student_id', 'first_name', 'last_name'] }
      ],
      order: [['submission_date', 'DESC']]
    });

    res.send(submissions);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};

module.exports = {
  createAssignment,
  getClassAssignments,
  getAssignmentDetails,
  submitAssignment,
  gradeAssignment,
  getAssignmentSubmissions
};