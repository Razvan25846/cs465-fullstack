
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

module.exports = {
  tripsList,
  tripsFindByCode
};