const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

// ------------ Import Controllers ------------
const authController = require('./controllers/auth.js');
const postsController = require('./controllers/posts.js');
const usersController = require('./controllers/users.js');
// -------------------------------------------

// ------------ Import Middleware ------------
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
// -------------------------------------------

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(favicon(path.join(__dirname, 'assets', 'images', 'travel-icon.png')));

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

app.get('/vip-lounge', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.send('Sorry, no guests allowed.');
  }
});

app.use(express.static('assets'));
app.use(passUserToView);
app.use('/auth', authController);
app.use('/users', usersController);
app.use(isSignedIn);
app.use('/users/:userId/posts', postsController);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
