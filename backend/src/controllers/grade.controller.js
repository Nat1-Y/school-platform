const { Grade } = require('../models/grade.model');
const { Student } = require('../models/student.model');
const { Subject } = require('../models/subject.model');
const { Semester } = require('../models/semester.model');

const addGrade = async (req, res) => {
  try {
    const { student_id, subject_id, semester_id, grade, comments } = req.body;
    const teacher_id = req.user.teacher_id;

    const gradeRecord = await Grade.create({
      student_id,
      teacher_id,
      subject_id,
      semester_id,
      grade,
      comments
    });

    res.status(201).send(gradeRecord);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getStudentGrades = async (req, res) => {
  try {
    const { student_id, semester_id } = req.query;
    
    const grades = await Grade.findAll({
      where: { student_id, semester_id },
      include: [
        { model: Subject, attributes: ['subject_name'] },
        { model: Teacher, attributes: ['first_name', 'last_name'] }
      ],
      order: [['subject_id', 'ASC']]
    });

    res.send(grades);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};

const getClassGrades = async (req, res) => {
  try {
    const { class_id, subject_id, semester_id } = req.query;
    
    const grades = await Grade.findAll({
      include: [
        {
          model: Student,
          where: { class_id },
          attributes: ['student_id', 'first_name', 'last_name']
        },
        { model: Subject, where: { subject_id }, attributes: [] }
      ],
      where: { semester_id },
      order: [['student_id', 'ASC']]
    });

    res.send(grades);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};

const updateGrade = async (req, res) => {
  try {
    const { grade_id } = req.params;
    const { grade, comments } = req.body;

    const gradeRecord = await Grade.findByPk(grade_id);
    if (!gradeRecord) {
      return res.status(404).send({ error: 'Grade record not found' });
    }

    gradeRecord.grade = grade;
    gradeRecord.comments = comments;
    await gradeRecord.save();

    res.send(gradeRecord);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  addGrade,
  getStudentGrades,
  getClassGrades,
  updateGrade
};