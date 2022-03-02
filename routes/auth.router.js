const express = require('express');

const {
  signupGET,
  signupPOST,
  loginGET,
  loginPOST,
  logoutGET,
} = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.get('/signup', signupGET);

authRouter.post('/signup', signupPOST);

authRouter.get('/login', loginGET);

authRouter.post('/login', loginPOST);

authRouter.get('/logout', logoutGET)

module.exports = authRouter;