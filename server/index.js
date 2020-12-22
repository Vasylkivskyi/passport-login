const express = require('express');
const cors = require('cors');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config');
const chalk = require('chalk');

let user = {};
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: keys.FACEBOOK.clientID,
  clientSecret: keys.FACEBOOK.clientSecret,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
},
(accessToken, refreshToken, profile, cb) => {
  console.log(chalk.blue(JSON.stringify(profile)));
  user = { ...profile };
  return cb(null, profile);
}));

// Google Strategy
passport.use(
  new GoogleStrategy({
    clientID: keys.GOOGLE.clientID,
    clientSecret: keys.GOOGLE.clientSecret,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(chalk.blue(JSON.stringify(profile)));
    user = { ...profile };
    return cb(null, user);
}));

// Creating the server
const app = express();
app.use(cors());
app.use(passport.initialize());

app.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile',],
  }
));

app.get(
  '/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/')
  }
);

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/profile/')
  }
);

// User Route
app.get("/user", (req, res) => {
  console.log("getting user data!");
  res.json(user);
});

// Logout Route
app.get('/auth/logout', (req, res) => {
  console.log('Logging out!...');
  user = {}
  res.redirect('/');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(chalk.gray(`Listening on http://localhost:${PORT}`)));