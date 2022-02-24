const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required: [true, 'Please enter email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minlength: [6, 'password must be at least 6 characters long']
  }
});

// fire a function after doc saved to db
userSchema.post('save', (doc, next) => {
  console.log(`new user is created and saved: ${doc}`);
  next();
})

// fire a function before doc saved to db
userSchema.pre('save', function(next) {
  console.log(`user about to be created: ${this}`);
  next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;