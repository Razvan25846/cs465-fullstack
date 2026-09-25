const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const dbURI = 'mongodb://127.0.0.1:27017/travlr';

const seedDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('Connected to MongoDB');

    require('./app_server/models/travlr');
    const Trip = mongoose.model('Trip');

    const dataPath = path.join(__dirname, 'data', 'trips.json');
    const trips = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    await Trip.deleteMany({});
    console.log('Existing trips removed');

    await Trip.insertMany(trips);
    console.log(`${trips.length} trips successfully loaded`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (err) {
    console.error('Error seeding database:', err);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDB();