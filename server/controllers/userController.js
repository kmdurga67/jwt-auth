const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Access the JWT secret key
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Fetch user profile using JWT
exports.getProfile = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    User.findById(decoded.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Error fetching user' });
      });
  });
};
