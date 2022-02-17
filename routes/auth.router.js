const express = require('express');

const {
  signupGET,
  signupPOST,
  loginGET,
  loginPOST
} = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.get('/signup', signupGET);

authRouter.post('/signup', signupPOST);

authRouter.get('/login', loginGET);

authRouter.get('/login', loginPOST);


module.exports = authRouter;