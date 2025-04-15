const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const bcrypt = require('bcryptjs');

const generateAuthToken = (user) => {
  return jwt.sign(
    { user_id: user.user_id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  
  if (!user) {
    throw new Error('Invalid login credentials');
  }

  const isPasswordMatch = await user.validPassword(password);
  
  if (!isPasswordMatch) {
    throw new Error('Invalid login credentials');
  }

  return generateAuthToken(user);
};

const registerUser = async (userData) => {
  const user = await User.create(userData);
  return generateAuthToken(user);
};

module.exports = {
  generateAuthToken,
  loginUser,
  registerUser
};