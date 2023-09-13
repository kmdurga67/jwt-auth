const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;

exports.getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, jwtSecretKey);
    const user = await User.findById(decoded.userId);

    if (!decoded.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};
