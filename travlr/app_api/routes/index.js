const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Authorization header required'
    });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
    return res.status(401).json({
      message: 'Invalid authorization format'
    });
  }

  const token = parts[1];

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET,
      { algorithms: ['HS256'] }
    );

    req.auth = verified;
    next();

  } catch (err) {
    return res.status(401).json({
      message: 'Invalid or expired token'
    });
  }
};

// Authentication routes
// Registration disabled after initial administrator setup.
// router.post('/register', authController.register);
router.post('/login', authController.login);

// Public trip routes
router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

// Protected trip routes
router.post('/trips', authenticateJWT, tripsController.tripsAddTrip);
router.put('/trips/:tripCode', authenticateJWT, tripsController.tripsUpdateTrip);
router.delete('/trips/:tripCode', authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;