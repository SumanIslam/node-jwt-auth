const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
require('dotenv').config();

const privateKey = process.env.privateKey;

const checkAuthentication = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(req.cookies);
  if(!token) {
    res.redirect('/auth/login');
  } else {
    try {
      const user = await jwt.verify(token, privateKey);

      if(user) {
        console.log(user);
        next();
      }
    } catch(err) {
      res.redirect('/auth/login');
    }
  }
}

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if(!token) {
    res.locals.user = null;
    next();
  } else {  
    try {
      const verifiedUser = await jwt.verify(token, privateKey);
      console.log(verifiedUser);

      if(verifiedUser) {
        res.locals.user = verifiedUser.id;
        next();
      }
    } catch(err) {
      res.locals.user = null;
      next();
    }
  }
}

module.exports = {
  checkAuthentication,
  checkUser
}