const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

require('dotenv').config();

const privateKey = process.env.privateKey;
const maxAge = 3 * 24 * 60 * 60;

// handle errors
const handleErrors = err => {
  console.log(err.message, err.code);
  let errors = { email: '', password: ''};

  if(err.message.includes("Email")) {
    errors.email = err.message;
  }
  if(err.message.includes("password")) {
    errors.password = err.message;
  }

  // duplicate email error code
  if(err.code === 11000) {
    errors.email = 'that email is already registered';
  }

  // validation errors
  if(err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties}) => {
     errors[properties.path] = properties.message;
    })
  }

  return errors;
}

const createToken = id => {
  return jwt.sign({ id }, privateKey, {
    expiresIn: maxAge
  })
}

const signupGET = (req, res) => {
  res.render('signup')
}

const loginGET = (req, res) => {
  res.render('login')
}

const signupPOST = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await userModel.create({ email, password});
    const token = createToken(user._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000
    })
    res.status(201).json({ user: user._id });
  } catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
}

const loginPOST = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await userModel.login(email, password);
    console.log(user);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id })
  } catch(err) {
    // console.log(err.message);
    const errors = handleErrors(err);
    res.status(400).json({ errors })
  }
}

module.exports = {
  signupGET,
  signupPOST,
  loginGET,
  loginPOST
}