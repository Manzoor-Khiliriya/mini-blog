const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/authRepository');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await authRepository.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await authRepository.createUser( username, email, hashedPwd );

    res.status(201).json({ message: 'User registered successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authRepository.findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { register, login };
