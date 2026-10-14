const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

// Create a salted password hash
userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(
    password,
    this.salt,
    100000,
    64,
    'sha512'
  ).toString('hex');
};

// Verify a password
userSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(
    password,
    this.salt,
    100000,
    64,
    'sha512'
  ).toString('hex');

  const stored = Buffer.from(this.hash, 'hex');
  const supplied = Buffer.from(hash, 'hex');

  return stored.length === supplied.length &&
    crypto.timingSafeEqual(stored, supplied);
};

// Generate a JSON Web Token
userSchema.methods.generateJWT = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const User = mongoose.model('users', userSchema);

module.exports = User;