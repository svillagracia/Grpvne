"use strict";

// Require bcrypt
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    firstName:{
      type:DataTypes.STRING,
      validate:{
        len:{
          args:[1,200],
          msg:'Please enter your first name.'
        }
      }
    },
    lastName:{
      type:DataTypes.STRING,
      validate:{
        len:{
          args:[1,200],
          msg:'Please enter your last name.'
        }
      }
    },
    email:{
      type:DataTypes.STRING,
      validate:{
        isEmail:{
          args:true,
          msg:'Please enter a valid email address.'
        }
      }
    },
    password:{
      type:DataTypes.STRING,
      validate:{
        len:{
        args:[8,100],
        msg:'Pleas enter a password that is at least 8 characters in length.'
        }
      }
    }
  }, {
    hooks:{
      beforeCreate:function(user,options,sendback){
        bcrypt.hash(user.password,10,function(err,hash){
          if(err){throw err;}
          user.password=hash;
          sendback(null,user);
        });
      }
    },
    classMethods: {
      associate: function(models) {
        models.user.hasMany(models.article);
      }
    }
  });
  return user;
};