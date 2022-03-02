const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const checkAuthentication = require('./middleware/auth.middleware');

const authRouter = require('./routes/auth.router');

const app = express();
require('dotenv').config();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// routes
app.use('/auth', authRouter);

app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',checkAuthentication, (req, res) => res.render('smoothies'));


// database connection
const dbURI = process.env.MONGO_URL;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000, () => {
    console.log('Server is running on port 3000...');
    console.log('mongodb is connected');
  }))
  .catch((err) => console.log(err));