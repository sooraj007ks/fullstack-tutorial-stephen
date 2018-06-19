const passport = require('passport');
const mongoose = require('mongoose');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// const User = mongoose.models('User');
const {
    UserModel: User
} = require('../models/user.model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    // Happens when login.  Inserting User data as req.user
    User.findById(userId)
        .then(user => {
            done(null, user);
        });

});


passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    User.findOne({
            googleId: profile.id
        })
        .then(existingUser => {
            if (existingUser) {
                return done(null, existingUser);
            }
            new User({
                    googleId: profile.id,
                    emailId:[profile.emails[0].value],
                    photos:[profile.photos[0].value.match(/(.+.jpg)/)[0]]
                })
                .save()
                .then(user => done(null, user));
        });

}));

module.exports = passport;