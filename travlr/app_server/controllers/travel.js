
/* GET travel page using the REST API */

const travel = async (req, res) => {
  try {
    const response = await fetch(
      'http://localhost:3000/api/trips'
    );

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const trips = await response.json();

    res.render('travel', {
      title: 'Travlr Getaways',
      trips
    });

  } catch (err) {
    console.error('Error retrieving trips:', err);
    res.status(500).send('Unable to load trips');
  }
};

/* GET trips as JSON through the REST API */

const travelList = async (req, res) => {
  try {
    const response = await fetch(
      'http://localhost:3000/api/trips'
    );

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const trips = await response.json();
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