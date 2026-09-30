
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Trip = require('./travlr');

const dbURI = 'mongodb://127.0.0.1:27017/travlr';

const seedDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('Connected to MongoDB');

    const dataPath = path.join(__dirname, '../../data/trips.json');
    const trips = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    await Trip.deleteMany({});
    console.log('Existing trips removed');

    await Trip.insertMany(trips);
    console.log(`${trips.length} trips successfully loaded`);

  } catch (err) {
    console.error('Error seeding database:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

seedDB();