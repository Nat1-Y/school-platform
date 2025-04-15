const { Attendance } = require('../models/attendance.model');
const { Student } = require('../models/student.model');
const { Class } = require('../models/class.model');
const { Subject } = require('../models/subject.model');
const { Semester } = require('../models/semester.model');

const markAttendance = async (req, res) => {
  try {
    const { student_id, class_id, subject_id, semester_id, date, period_number, status } = req.body;
    const teacher_id = req.user.teacher_id;

    const attendance = await Attendance.create({
      student_id,
      class_id,
      teacher_id,
      subject_id,
      semester_id,
      date,
      period_number,
      status
    });

    res.status(201).send(attendance);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getClassAttendance = async (req, res) => {
  try {
    const { class_id, subject_id, semester_id, date } = req.query;
    
    const attendance = await Attendance.findAll({
      where: { class_id, subject_id, semester_id, date },
      include: [
        { model: Student, attributes: ['student_id', 'first_name', 'last_name'] },
        { model: Subject, attributes: ['subject_name'] }
      ]
    });

    res.send(attendance);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};

const getStudentAttendance = async (req, res) => {
  try {
    const { student_id, semester_id } = req.query;
    
    const attendance = await Attendance.findAll({
      where: { student_id, semester_id },
      include: [
        { model: Class, attributes: ['class_name'] },
        { model: Subject, attributes: ['subject_name'] },
        { model: Teacher, attributes: ['first_name', 'last_name'] }
      ],
      order: [['date', 'DESC']]
    });

    res.send(attendance);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { attendance_id } = req.params;
    const { status } = req.body;

    const attendance = await Attendance.findByPk(attendance_id);
    if (!attendance) {
      return res.status(404).send({ error: 'Attendance record not found' });
    }

    attendance.status = status;
    await attendance.save();

    res.send(attendance);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  markAttendance,
  getClassAttendance,
  getStudentAttendance,
  updateAttendance
};