var express = require('express');
var router = express.Router();
var passport = require('passport');

/* Utility functin to check if user is authenticated */
function requireAuth(req, res, next) {

    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
};

/* GET todolist page. */
router.get('/todoList', requireAuth, function (req, res, next) {
    res.render('todos/index', {
        title: 'Todo List',
        displayName: req.user ? req.user.displayName : '',
        username: req.user ? req.user.username : ''
    });
});

/* get home page. */
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

/* Process login request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/businesscontact',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Process Logout request */
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

/* Show registration page */
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
    //Success/fail to go to Profile Page
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));

module.exports = router;
