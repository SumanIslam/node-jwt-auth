const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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

// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// declare login statics function
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if(user) {
    const auth = await bcrypt.compare(password, user.password);

    if(auth) {
      return user;
    }
    throw Error('Incorrect password. Please provide correct password')
  }
  throw Error('Incorrect Email. Please provide correct Email')
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;