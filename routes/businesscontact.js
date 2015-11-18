var express = require('express');
var router = express.Router();
var BC = require('../models/contact');
var mongoose = require('mongoose');
var passport = require('passport');

/* check if user is authenticatd */
function requireAuth(req, res, next) {

    // check if the user is logged in
    if (!req.isAuthenticated()) {
        res.redirect('/login');
    }
    next();
}

/* Render contact page. */
router.get('/', requireAuth, function (req, res, next) {
    BC.find(function (err, contact) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            console.log(contact);
            res.render('businesscontact/index', {
                title: 'business contact',
                contact: contact,
                username: req.user ? req.user.username : ''
            });
        }
    });
});

/* Render Add contact Page */
router.get('/add', requireAuth, function (req, res, next) {
    res.render('businesscontact/add', {
        title: 'add business contacts',
        username: req.user ? req.user.username : ''
       
    });
});


router.post('/add', requireAuth, function (req, res, next) {
   
    BC.create({
        name: req.body.name,
        tel:req.body.tel,
        email: req.body.email,
        address: req.body.address       
    }, function (err, contact) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesscontact');
        }
    });
});

router.get('/:id', requireAuth, function (req, res, next) {   
    var id = req.params.id;
    // use mongoose to find the right contact
    BC.findById(id, function (err, contact) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('businesscontact/edit', {
                title: 'edit contact',
                contact: contact,
                username: req.user ? req.user.username : ''
            });
        }
    });
});


router.post('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;

    // create an contact object
    var contact = new BC({
        _id: id,
        name: req.body.name,
        tel: req.body.tel,
        email: req.body.email,
        address: req.body.address
    });

    
    // use mongoose to do the update
    BC.update({ _id: id }, contact, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesscontact');
        }
    });
});


router.get('/delete/:id', requireAuth,function (req, res, next) {
    var id = req.params.id;
    BC.remove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesscontact');
        }
    });
});
module.exports = router;










