
const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

// GET /api/trips - Retrieve all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({
      message: 'Error retrieving trips'
    });
  }
};

// GET /api/trips/:tripCode - Retrieve one trip
const tripsFindByCode = async (req, res) => {
  const tripCode = req.params.tripCode;

  if (!tripCode) {
    return res.status(400).json({
      message: 'Trip code is required'
    });
  }

  try {
    const trip = await Trip.findOne({
      code: tripCode
    }).exec();

    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({
      message: 'Error retrieving trip'
    });
  }
};

// POST /api/trips - Create a new trip
const tripsAddTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    return res.status(201).json(trip);
  } catch (err) {
    return res.status(400).json({
      message: 'Error creating trip',
      error: err.message
    });
  }
};

// PUT /api/trips/:tripCode - Update an existing trip
const tripsUpdateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      req.body,
      { new: true, runValidators: true }
    );

    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(400).json({
      message: 'Error updating trip',
      error: err.message
    });
  }
};

// DELETE /api/trips/:tripCode - Delete a trip
const tripsDeleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      code: req.params.tripCode
    });

    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    return res.status(200).json({
      message: 'Trip deleted successfully',
      trip
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error deleting trip',
      error: err.message
    });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};