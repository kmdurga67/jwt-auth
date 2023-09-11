const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Access the JWT secret key
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// asynchronous route handler where it receives the JWT in request headers authorization field (in the form of Bearer <Token>)
exports.getProfile = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, jwtSecretKey, (err, decoded) => {  //verifies the JWT token using jwt.verify with the provided secret key
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    User.findById(decoded.userId)  //if token is successfully verified, find a user in the database
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
