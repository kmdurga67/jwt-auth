const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;

//To Register new user
exports.register = async (req, res) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
      designation,
      hobbies,
      address,
      gender,
      confirmPassword,
    } = req.body;

    // Hashing of the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedconfirmPassword = await bcrypt.hash(confirmPassword, 10);

    const user = new User({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      phoneNumber,
      designation,
      hobbies,
      address,
      gender,
      confirmPassword: hashedconfirmPassword,
    });

    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Login and generating JWT token
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!user && !passwordMatch) {
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
