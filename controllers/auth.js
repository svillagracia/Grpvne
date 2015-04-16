// Require NodeJS modules
var express = require('express');
var router = express.Router();
var request = require('request');
var bcrypt = require('bcrypt');
var db = require('../models');

// GET Login form.
router.get('/login',function(req,res){
  res.render('auth/login');
});

//POST /login
//process login data and login user
router.post('/login',function(req,res){
  // login (check password and set session value)
  db.user.find({where:{email:req.body.logMail}})
  .then(function(user){
      if(user){
        bcrypt.compare(req.body.logPass,user.password,function(err,result){
          if(err){throw err;}

          if(result){
            // Store user to session
            req.session.user={
              id:user.id,
              email:user.email,
              firstName:user.firstName
            };
            // If Password and email match.
            req.flash('info','You have been logged in.');
            res.redirect('/');
          }else{
          // If password doesn't match.
          req.flash('danger','Invalid password.')
          res.redirect('login')
          }
        })
      }else{
        // If email is not found.
        req.flash('info','User not found. Please register.')
        res.redirect('register');
      }
  })
});

// GET Registration form.
router.get('/register',function(req,res){
  res.render('auth/register');
});

// POST /register
// Register user for an account.
router.post('/register',function(req,res){

  // Declare variables for form values.
  var userQuery={email:req.body.email};
  var userData={
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    password:req.body.password
  };

  // Find/Create user in database.
  db.user.findOrCreate({where:userQuery,defaults:userData})
  .spread(function(user,created){
      if(created){
        // res.send('new user created.');
        req.flash('success','Account successfully created! Please log in.')
        res.redirect('login');
      }else{
        // res.send('The entered email is already in use.');
        req.flash('warning','That email is already in use. Please log in or enter a different email address.')
        res.redirect('register');
      }
  })
  .catch(function(error){
    console.log('error',error);
    res.send(error);
  })
});

// GET /logout
// logout logged in user
router.get('/logout',function(req,res){
  delete req.session.user;
  req.flash('success','You have successfully ended your session. Come back soon!')
  res.redirect('/');
});

module.exports = router;