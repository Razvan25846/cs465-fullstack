const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user');

// Register a new user
const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'All fields required'
    });
  }

  try {
    const user = new User();

    user.name = req.body.name;
    user.email = req.body.email.trim().toLowerCase();
    user.setPassword(req.body.password);

    await user.save();

    const token = user.generateJWT();

    return res.status(201).json({ token });

  } catch (err) {
    console.error('Registration error:', err);

    if (err.code === 11000) {
      return res.status(409).json({
        message: 'User already exists'
      });
    }

    return res.status(500).json({
      message: 'Registration failed'
    });
  }
};

// Log in an existing user
const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'All fields required'
    });
  }

  req.body.email = req.body.email.trim().toLowerCase();

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({
        message: 'Authentication error'
      });
    }

    if (user) {
      const token = user.generateJWT();

      return res.status(200).json({ token });
    }

    return res.status(401).json({
      message: info?.message || 'Invalid credentials'
    });

  })(req, res);
};

module.exports = {
  register,
  login
};