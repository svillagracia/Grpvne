// Require Node Modules
var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

// GET for User Trellis page (profile/dashboard)
router.get('/',function(req,res){
  if(req.getUser){
    var user = req.getUser();
    db.article.findAll({where:{userId:user.id}}).then(function(saved){
      var articleArr = saved.map(function(fave){
        return {id:fave.id,redditId:fave.redditId,subreddit:fave.subreddit,title:fave.title,url:fave.url,userId:fave.userId};
      })
    res.render('profile/index',{articleList:articleArr});
    })
  }else{
    req.flash('danger','Please log in to access Grpvne.');
    res.redirect('/');
  }
});

//POST to save article to database for Trellis Page (Profile/favorites list)
router.post('/:id',function(req,res){
  db.article.findOrCreate({where: {redditId:req.body.id,subreddit:req.body.subreddit,title:req.body.title,url:req.body.url,userId:req.body.userId}})
  .spread(function(data,created){
    res.send(data);
  })
});

//DELETE to remove article from Trellis.
router.delete('/:id',function(req,res){
  db.article.destroy({where:{redditId:req.params.id}}).then(function(){
    res.send({result:true});
  })
})

module.exports = router;