const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Access the JWT secret key
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, password,firstName, lastName, email,phoneNumber,designation,hobbies,address,gender,confirmPassword } = req.body;
    const user = new User({ username, password ,firstName, lastName, email,phoneNumber,designation,hobbies,address,gender,confirmPassword });
    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Login and generate a JWT token
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
};
