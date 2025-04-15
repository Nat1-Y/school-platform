const { MessageBoard } = require('../models/messageBoard.model');
const { Student } = require('../models/student.model');
const { Notification } = require('../models/notification.model');

const sendMessage = async (req, res) => {
  try {
    const { student_id, recipient_role, message_text } = req.body;
    const sender_id = req.user.user_id;

    const message = await MessageBoard.create({
      sender_id,
      student_id,
      recipient_role,
      message_text
    });

    // Create notification if not sending to "all"
    if (recipient_role !== 'all') {
      await Notification.create({
        user_id: student_id || sender_id, // Simplified for demo
        message: `New message from ${req.user.username}`,
        is_read: false
      });
    }

    res.status(201).send(message);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const user = req.user;
    let messages;

    if (user.role === 'teacher' || user.role === 'admin') {
      messages = await MessageBoard.findAll({
        where: { recipient_role: ['all', user.role] },
        include: [
          { model: Student, attributes: ['first_name', 'last_name'] }
        ],
        order: [['posted_at', 'DESC']]
      });
    } else if (user.role === 'parent') {
      const parent = await Parent.findOne({ where: { user_id: user.user_id } });
      messages = await MessageBoard.findAll({
        where: {
          [Op.or]: [
            { recipient_role: ['all', 'parent'] },
            { 
              recipient_role: 'student',
              student_id: { 
                [Op.in]: sequelize.literal(`(
                  SELECT student_id FROM students WHERE parent_id = ${parent.parent_id}
                )`)
              }
            }
          ]
        },
        include: [
          { model: Student, attributes: ['first_name', 'last_name'] }
        ],
        order: [['posted_at', 'DESC']]
      });
    } else { // student
      messages = await MessageBoard.findAll({
        where: {
          [Op.or]: [
            { recipient_role: ['all', 'student'] },
            { student_id: user.student_id }
          ]
        },
        order: [['posted_at', 'DESC']]
      });
    }

    res.send(messages);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};

module.exports = {
  sendMessage,
  getMessages
};