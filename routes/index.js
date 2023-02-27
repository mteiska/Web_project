require('dotenv').config();
var express = require('express');
var router = express.Router();
const Comment = require("../models/Comment");
const Post = require("../models/Post");

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js")
let User_list = []

/* GET home page. */
router.get('/', function (req, res, next) {
  Post.find({}, (err, posts) => {
    if (err) {
      res.render('index', { title: 'Stackoverflow clone' });
    }
    res.render('index', { title: 'Stackoverflow clone', posts });

  })

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
  (req, res, next) => {
    console.log(req.body)
    const errors = validationResult(req);
    // help from to get right format for check without regex https://stackoverflow.com/questions/34760548/how-to-validate-password-using-express-validator-npm

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;

      if (user) {
        return res.status(403).json({ email: "email already in use." });
      } else {

        console.log(req.body)
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            User.create(
              {
                email: req.body.email,
                password: hash
              },
              (err, ok) => {
                if (err) throw err;
                user = ok.toJSON()
                User_list.push({
                  email: user.email,
                  password: user.password,
                  id: user._id
                })


                res.redirect('/')
              }
            )
          })
        })
      }
    })
  })
router.get("/api/user/login", (req, res, next) => {
  res.render("login");
});

router.get("/api/user/open/:id", (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) throw err;
    res.render("Post", { post })
  })
})

router.get("/api/user/open/auth/:id", (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) throw err;
    res.render("Post_auth", { post })
  })
})
router.post("/api/user/createPost", body("post_title"), body("post_text"),
  (req, res, next) => {
    Post.create({
      postname: req.body.post_title,
      code: req.body.post_text,
      comment_ids: []
    }, (err, ok) => {
      if (err) throw err;
      Post.find({}, (err, posts) => {
        res.render("posts", { posts })
      })
    })
  })
  router.post("/api/user/getComments", async function(req,res,next){
    console.log(req.body)
    const records = await Comment.find({ '_id': { $in: req.body } });
      res.json(records)
    })
 
router.post("/api/user/createComment/:id",
  body("comment"),
  (req, res, next) => {

    Comment.create({
      comment_text: req.body.comment

    }, (err, ok) => {
      if (err) throw err;
      let comment = ok.toJSON()
      console.log(req.params.id)
      Post.findByIdAndUpdate(req.params.id, { $push: { "comment_ids": comment._id.valueOf() } },
        {
          new: true
        }, (err, ok) => {
          if (err) throw err;
          let post = ok.toJSON()
          console.log(post)
          Post.findById(req.params.id, (err, post) => {
            if (err) throw err;
            res.render("Post_auth", { post })
          })

        }

      )
    }
    )
  }
)




router.post('/api/user/login',
  body("email"),
  body("password"),
  (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
      //Check if email is the same.
      if (!user) {

        res.redirect(401, "/")
      } else {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (!isMatch) {
            res.redirect(401, "/")
          }
          if (isMatch) {
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
                if (token) {
                  //res.json({success: true, token});
                  Post.find({}, (err, posts) => {
                    if (err) return next(err);
                    res.render("posts", { posts })
                  })
                }
                else {
                  res.redirect("/")
                }
              }
            );
          }
        })
      }

    })

  });
module.exports = router;
