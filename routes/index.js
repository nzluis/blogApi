const router = require('express').Router()
const utils = require('../config/utils');
const passport = require('passport');
const bcrypt = require('bcryptjs')

const User = require('../models/user')
const Post = require('../models/post')

router.get('/', (req, res, next) => {
    res.send('<h1>HOME PAGE BLOG</h1>')
})

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

router.post('/login', function(req, res, next){

    User.findOne({ username: req.body.username })
        .then((user) => {

            if (!user) {
                return res.status(401).json({ success: false, msg: "could not find user" });
            }
            
            // Function defined at bottom of app.js
            bcrypt.compare(req.body.password, user.password).then(isValid => {
                if (isValid) {
                    const tokenObject = utils.issueJWT(user);
                    res.status(200).json({ success: true, user, token: tokenObject.token, expiresIn: tokenObject.expires });
                } else {
                    res.status(401).json({ success: false, msg: "you entered the wrong password" });
                }
            })
             .catch((err) => {
                next(err);
            });
        })
});

router.post('/register', function(req, res, next){

    const user = new User({
        username: req.body.username,
        password: ''
    });
    bcrypt.hash(req.body.password, 10, function(err, hashpassword) {
        if (err) {
            return next(err)
        }
        user.password = hashpassword
        user.save().then(() => {
            const jwt = utils.issueJWT(user)
            res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires})
        }).catch(err => {
            return next(err)
            // res.json({ success: false, msg: err });
        })
    })
});


module.exports = router