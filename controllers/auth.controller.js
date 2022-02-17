const userModel = require('../models/User')

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
    console.log(err);
    res.status(400).json('error, user is not created');
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