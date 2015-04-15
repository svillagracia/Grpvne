// Require NodeJS modules
var express = require('express');
var router = express.Router();
var request = require('request');
var bcrypt = require('bcrypt');

router.get('/',function(req,res){
  res.render('auth/index');
});

module.exports = router;