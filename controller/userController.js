const bcrypt = require('bcryptjs')
const utils = require('../config/utils')
const User = require('../models/user')

module.exports.login_post = (req, res, next) => {

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
}

module.exports.create_new_get = (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
}