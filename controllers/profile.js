// Require Node Modules
var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/',function(req,res){
  if(req.getUser()){
    res.render('profile/index');
  }else{
    req.flash('danger','Please log in to access Grpvne.');
    res.redirect('/');
  }
});

module.exports = router;