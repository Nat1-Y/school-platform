const { Report } = require('../models/report.model');
const { Class } = require('../models/class.model');
const { Semester } = require('../models/semester.model');

const generateReport = async (req, res) => {
  try {
    const { report_type, class_id, semester_id, file_path } = req.body;
    const created_by = req.user.user_id;

    const report = await Report.create({
      report_type,
      class_id,
      semester_id,
      file_path,
      created_by
    });

    res.status(201).send(report);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await Report.findAll({
      include: [
        { model: Class, attributes: ['class_name'] },
        { model: Semester, attributes: ['semester_name'] }
      ],
      order: [['generated_at', 'DESC']]
    });

    res.send(reports);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};

module.exports = {
  generateReport,
  getReports
};