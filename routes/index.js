require('dotenv').config();
var express = require('express');
var router = express.Router();
const Comment = require("../models/Comment");
const Post = require("../models/Post");

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const {body, validationResult} = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js")
let User_list = []

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stackoverflow clone' });
});

router.get("/api/user/register", (req, res, next) => {
  res.render("register");
});

router.post("/api/user/register", 
body("email"),
body("password")
  .isString()
  .isLength({ min: 8 })
  .not()
  .isLowercase()
  .not()
  .isUppercase()
  .not()
  .isNumeric()
  .not()
  .isAlpha(),
(req, res, next) =>{
  console.log(req.body)
  const errors = validationResult(req);
  // help from to get right format for check without regex https://stackoverflow.com/questions/34760548/how-to-validate-password-using-express-validator-npm
  
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  User.findOne({email: req.body.email}, (err, user) => {
    if(err) throw err;
  
    if(user){
      return res.status(403).json({email: "email already in use."});
    }else {

      console.log(req.body)
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if(err) throw err;
            User.create(
            {
              email: req.body.email,
              password: hash
            },
            (err, ok) => {
              if(err) throw err;
              user = ok.toJSON()
              User_list.push({email: user.email,
                password: user.password,
                id: user._id })
              
             
              return res.redirect('/')
            }
          )
        })
      })
    }
  })
})

router.post('/api/user/login', 
  body("email"),
  body("password"),
  (req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) =>{
    if(err) throw err;
    //Check if email is the same.
    if(!user) {
      return res.status(401).json({message: "Login failed."});
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(!isMatch){
          return res.status(401).json({message: "Login failed."});
        }
        if(isMatch) {
          const jwtPayload = {
            id: user._id,
            email: user.email
          }
          jwt.sign(
            jwtPayload,
            process.env.SECRET,
            {
              expiresIn: 180000
            },
            (err, token) => {
              res.json({success: true, token});
            }
          );
        }
      })
    }

    })

});
module.exports = router;
