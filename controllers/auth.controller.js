const signupGET = (req, res) => {
  res.render('signup')
}
const loginGET = (req, res) => {
  res.render('login')
}
const signupPOST = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send(req.body)
}
const loginPOST = (req, res) => {
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