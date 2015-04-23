// Require NodeJS modules
var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var db = require('../models');
var async = require('async');
var Twitter = require('twitter');
var Instagram = require('instagram-node-lib');

// middleware
router.use(bodyParser.urlencoded({extended: false}));

// Instagram API ID and Secret
Instagram.set('client_id', process.env.INSTA_KEY);
Instagram.set('client_secret', process.env.INSTA_SECRET);

// Twitter API ID and Secret
var client = new Twitter({
  consumer_key: process.env.TWIT_KEY,
  consumer_secret: process.env.TWIT_SEC,
  access_token_key: process.env.TWIT_TOKEN,
  access_token_secret: process.env.TWIT_ATS
});

// GET query entered - Begins call to Reddit, Twitter, and Instagram.
router.get('/',function(req,res){
  if(req.getUser()){

  // Object to push data into.
  var locals={};

  // API call to Reddit.
  var getRedditNewsData = function(next){
    var myData = {
      q: req.query.q,
      limit: 25,
      restrict_sr:'on',
      sort:'relevance',
      t:'all'
    };

    if (req.query.q == ''){res.redirect('noresults')}
    /* Async for Reddit. async.concat calling two subreddits simultaneously.
    Concatenating both subbreddit JSONs into one array.*/
    async.concat(['r/news','r/worldnews'],function(subR,callback){
      request({
        url:'http://www.reddit.com/'+subR+'/search.json',
        qs:myData
      },
      function(error,response,data){
        if(!error && response.statusCode == 200){
          var news = JSON.parse(data);
          callback(null, news.data.children || []);
          // console.log(news);
        }else{
          console.log('error output',error,response);
          callback(error);
        }
      })

    },function(err,results){
      if(err) throw err;
      // Sorting posts from both subreddits by date created, starting with most recent.
      results.sort(function(a,b){
        return b.data.created - a.data.created;
      });
      locals.redditResults=results;
      next();
    });
  }

  // API call to Twitter.
  var getTweets = function(next){
    client.get('search/tweets', {
      q: req.query.q,
      lang: 'en'
    },function(error, tweets, response){
      // if(error) throw error;
      // console.log(error);
      // console.log(tweets.statuses);
      locals.tweetRes=tweets.statuses;
      next();
    });
  }

  // API call to Instagram.
  var getPics = function(next){
    // console.log('top of get pics');
    Instagram.tags.recent({
      name: req.query.q,
      complete: function(data){
        console.log(data);
        locals.pics=data;
        next();
      }
    });
  }

  // Final function to render page and data.
  var renderPage = function(err){
    if(err){
      res.render('main/error');
      // throw err;
    }else{
      res.render('results/index',locals);
      // res.send(locals);
    }
  }

  // Redirect back to homepage and display message if not logged in.
  async.parallel([getRedditNewsData,getTweets,getPics],renderPage);
  }else{
    req.flash('danger','Please log in to access Grpvne.');
    res.redirect('/');
  }

}); // Close GET.

// GET for r/worldnews show page.
router.get('/:sub/:id',function(req,res){
  var user = req.getUser();
  if(user){
  var query = req.params.id;
    var url = 'http://www.reddit.com/r/'+req.params.sub+'/comments/'+query+'.json';
      request(url,function(error,response,data){
        if(!error && response.statusCode === 200){
          var article = JSON.parse(data);
          var object = article[0].data.children[0].data;
          db.article.findAll({where:{redditId:object.id}})
          .then(function(trellis){
            trellis.forEach(function(story){
              if(story.userId === user.id){
                object.matched = true;
              }
            })
          res.render('results/show', {article:object});
          }).catch(function(error){
          object.matched = false;
          res.render('results/show', {article:object});
          })
        }else{
          console.log('error',error,response);
        }
      })
  }else{
    req.flash('danger','Please log in to access Grpvne.');
    res.redirect('/');
  }
});

router.get('/noresults',function(req,res){
  res.render('results/noresults');
});

module.exports = router;