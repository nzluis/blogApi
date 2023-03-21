const bcrypt = require("bcryptjs");
const utils = require("../config/utils");
const User = require("../models/user");
const Post = require("../models/post");
const { check, body, validationResult } = require("express-validator");

module.exports.login_post = (req, res, next) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: "could not find user" });
    }

    // Function defined at bottom of app.js
    bcrypt
      .compare(req.body.password, user.password)
      .then((isValid) => {
        if (isValid) {
          const tokenObject = utils.issueJWT(user);
          res
            .status(200)
            .json({
              success: true,
              user,
              token: tokenObject.token,
              expiresIn: tokenObject.expires,
            });
        } else {
          res
            .status(401)
            .json({ success: false, msg: "you entered the wrong password" });
        }
      })
      .catch((err) => {
        next(err);
      });
  });
};

module.exports.create_new_get = (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      msg: "You are successfully authenticated to this route!",
    });
};

module.exports.create_new_post = [
  body("title", "Pleas insert a title").trim().isLength({ min: 1 }).escape(),
  body("text", "Pleas insert a text").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const post = new Post({
      title: req.body.title,
      author: "64158f9d150124daa34a0572",
      text: req.body.text,
      status: req.body.status,
    });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
    } else {
      post
        .save()
        .then(() => {
          res.json({ message: `Post '${post.title}' successfully saved` });
        })
        .catch((err) => {
          res.json({ message: "Post Failed", err });
        });
    }
  },
];
