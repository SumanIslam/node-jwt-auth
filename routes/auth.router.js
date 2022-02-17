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

authRouter.post('/login', loginPOST);


module.exports = authRouter;