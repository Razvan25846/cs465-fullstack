
const Trip = require('../models/travlr');

/* GET travel page */
const travel = async (req, res) => {
  try {
    const trips = await Trip.find({}).lean();

    res.render('travel', {
      title: 'Travlr Getaways',
      trips
    });
  } catch (err) {
    console.error('Error retrieving trips:', err);
    res.status(500).send('Unable to load trips');
  }
};

/* GET trips as JSON */
const travelList = async (req, res) => {
  try {
    const trips = await Trip.find({}).lean();
    res.status(200).json(trips);
  } catch (err) {
    console.error('Error retrieving trips:', err);
    res.status(500).json({
      message: 'Unable to retrieve trips'
    });
  }
};

module.exports = {
  travel,
  travelList
};