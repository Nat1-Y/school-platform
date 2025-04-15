const { User } = require('../models/user.model');
const { Teacher } = require('../models/teacher.model');
const { Parent } = require('../models/parent.model');
const { Student } = require('../models/student.model');

const getUserDetails = async (req, res) => {
  try {
    const user = req.user;
    let profile = null;

    switch (user.role) {
      case 'teacher':
        profile = await Teacher.findOne({ where: { user_id: user.user_id } });
        break;
      case 'parent':
        profile = await Parent.findOne({ where: { user_id: user.user_id } });
        break;
      case 'student':
        profile = await Student.findOne({ 
          where: { user_id: user.user_id },
          include: [{
            model: Parent,
            attributes: ['first_name', 'last_name', 'phone_number']
          }]
        });
        break;
    }

    res.send({ user, profile });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'password_hash'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    updates.forEach(update => user[update] = req.body[update]);
    await user.save();

    res.send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  getUserDetails,
  updateProfile
};