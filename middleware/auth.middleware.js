const jwt = require('jsonwebtoken');
require('dotenv').config();

const privateKey = process.env.privateKey;

const checkAuthentication = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(req.cookies);
  if(!token) {
    res.redirect('/auth/login');
    // return res.status(400).json({errors: 'No Token Found'})
  } else {
    try {
      const user = await jwt.verify(token, privateKey);

      if(user) {
        console.log(user);
        next();
      }
    } catch(err) {
      // res.redirect('/auth/login');
      return res.status(400).json({errors: 'Invalid Token'});
    }
  }
}

module.exports = checkAuthentication;