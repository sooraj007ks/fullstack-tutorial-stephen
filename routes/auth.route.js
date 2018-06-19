// const passport = require('passport');
const passport = require('../authentication/passport.auth');
const loginChecker = require('../middlewares/loginCheck.mw');

const router = require('express').Router();

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', 
    passport.authenticate('google'), 
    (req, res) => {
        res.redirect('/surveys');
});

router.get('/api/logout', loginChecker, (req, res) => {
    req.logout(); // A function attached by passport.It Will remove cookies.
    res.redirect('/');
});

router.get('/api/current_user', (req, res) => {
    res.send(req.user);
});

module.exports = router;