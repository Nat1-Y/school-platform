const { loginUser, registerUser } = require('../services/auth.service');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const userData = req.body;
    const token = await registerUser(userData);
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};

module.exports = {
  login,
  register,
  getProfile
};