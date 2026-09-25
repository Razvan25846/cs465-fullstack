const mongoose = require('mongoose');

const dbURI = 'mongodb://127.0.0.1:27017/travlr';

mongoose.connect(dbURI);

// Monitor Mongoose connection events
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Close the Mongoose connection
const gracefulShutdown = async (msg) => {
  try {
    await mongoose.connection.close();
    console.log(`Mongoose disconnected through ${msg}`);
  } catch (err) {
    console.log(`Mongoose shutdown error: ${err}`);
  }
};

// nodemon restart
process.once('SIGUSR2', async () => {
  await gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

// Application termination
process.on('SIGINT', async () => {
  await gracefulShutdown('app termination');
  process.exit(0);
});

// Heroku/app termination
process.on('SIGTERM', async () => {
  await gracefulShutdown('app shutdown');
  process.exit(0);
});

// Load application models
require('./travlr');