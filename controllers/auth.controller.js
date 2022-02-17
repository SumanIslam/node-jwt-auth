const signupGET = (req, res) => {
  res.render('signup')
}
const loginGET = (req, res) => {
  res.render('login')
}
const signupPOST = (req, res) => {
  res.send('new signup')
}
const loginPOST = (req, res) => {
  res.send('new login')
}

module.exports = {
  signupGET,
  signupPOST,
  loginGET,
  loginPOST
}