const router = require('express').Router()
const utils = require('../config/utils');
const passport = require('passport');
const bcrypt = require('bcryptjs')

const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comment')

const indexController = require('../controller/indexController')
const userController = require('../controller/userController')

router.get('/', indexController.post_list_get)

// router.get('/post/:id', indexController.post_detail_get)
// router.post('/post/:id', indexController.post_detail_post)

// router.get('/user/login', userController.login_get)
router.post('/user/login', userController.login_post)

router.get('/post/newPost', passport.authenticate('jwt', { session: false }), userController.create_new_get)
// router.post('/post/newPost', passport.authenticate('jwt', { session: false }), userController.create_new_post)

module.exports = router

// router.post('/register', function(req, res, next){

//     const user = new User({
//         username: req.body.username,
//         password: ''
//     });
//     bcrypt.hash(req.body.password, 10, function(err, hashpassword) {
//         if (err) {
//             return next(err)
//         }
//         user.password = hashpassword
//         user.save().then(() => {
//             const jwt = utils.issueJWT(user)
//             res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires})
//         }).catch(err => {
//             return next(err)
//             // res.json({ success: false, msg: err });
//         })
//     })
// });