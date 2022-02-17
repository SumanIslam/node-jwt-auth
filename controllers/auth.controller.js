const userModel = require('../models/User');

// handle errors
const handleErrors = err => {
  console.log(err.message, err.code);
  let errors = { email: '', password: ''};

  // duplicate error code
  if(err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if(err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties}) => {
     errors[properties.path] = properties.message;
    })
  }

  return errors;
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
    const user = await userModel.create({ email, password})
    res.status(201).json(user);
  } catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
}
const loginPOST = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send(req.body)
}

module.exports = {
  signupGET,
  signupPOST,
  loginGET,
  loginPOST
}