var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Yuelin', username: req.user ? req.user.username : '' });
});
router.get('/index', function (req, res, next) {
    res.render('index', { title: 'Yuelin', username: req.user ? req.user.username : '' });
});
router.get('/about', function (req, res, next) {
    res.render('about', { title: 'About', username: req.user ? req.user.username : '' });
});
router.get('/contact', function (req, res, next) {
    res.render('contact', { title: 'Contact', username: req.user ? req.user.username : '' });
});
router.get('/service', function (req, res, next) {
    res.render('service', { title: 'Service', username: req.user ? req.user.username : '' });
});
router.get('/project', function (req, res, next) {
    res.render('project', { title: 'Project', username: req.user ? req.user.username : '' });
});

/* Render Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            username: req.user ? req.user.username : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/businesscontact',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Process Logout Request */
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

/* Show Registration Page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registrationMessage'),
            username: req.user ? req.user.username : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* POST signup data. */
router.post('/register', passport.authenticate('local-registration', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));

module.exports = router;
