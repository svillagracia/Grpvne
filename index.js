// Require Node Modules
var db = require('./models');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var resultsCtrl = require('./controllers/results');
var authCtrl = require('./controllers/auth');
var profCtrl = require('./controllers/profile')

// Configure express
var app = express();
app.set('view engine','ejs');

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:true
}));
app.use(flash());

// Custom middleware - is user logged in
app.use(function(req,res,next){
  req.getUser = function(){
    return req.session.user || false;
  }
  next();
});

// Middleware to determine which usr is logged in.
// Also used for flash messages.
app.use(function(req,res,next){
  res.locals.user = req.getUser();
  res.locals.alerts = req.flash();
  next();
})

// Controllers
app.use('/results',resultsCtrl);
app.use('/auth',authCtrl);
app.use('/profile',profCtrl);


// Render the welcome page.
app.get('/',function(req,res){
  res.render('main/index');
});

// Render the 404 page.
app.use(function(req,res){
  res.status(400);
  res.render('main/error');
});

app.listen(process.env.PORT || 3000);
