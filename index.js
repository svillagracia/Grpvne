// Require Node Modules
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var resultsCtrl = require('./controllers/results');
var authCtrl = require('./controllers/auth');

app.set('view engine','ejs');

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

// Routers
app.use('/results',resultsCtrl);
app.use('/auth',authCtrl);

// Render the welcome page.
app.get('/',function(req,res){
  res.render('main/index');
});

app.listen(3000,function(){
  console.log('Goliath Online. Port: 3000...');
});

// Instagram.tags.info({
//   name: 'blue',
//   complete: function(data){
//     console.log(data);
//   }
// });
