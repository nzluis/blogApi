const Post = require('../models/post')
const Comment = require('../models/comment')
const { check, body, validationResult } = require('express-validator');

module.exports.post_list_get = (req, res, next) => {
    Post.find({ status: 'Show'}).populate('author').sort({ timestamp: 1}).exec()
    .then(results => {
        res.json({ message: 'Success', posts: results })
    })
    .catch(err => {
        res.status(500).json({ message: "something went wrong"})
    })
}

module.exports.post_detail_get = (req, res, next) => {
    Post.findOne({ _id: req.params.postId }).populate("author").exec()
    .then(post => {
        res.json({ message: `Post '${post.title}' found`, post})
    })
    .catch(err => {
        res.status(404).json({ message: `Post with id: ${req.params.postId} Not Found`, err})
    })
}

module.exports.comments_list_get = (req, res, next) => {
    Comment.find({ blog_id: req.params.postId }).sort( { timestamp: 1 }).exec()
    .then(results => {
        res.json({ message: 'Success', comments: results})
    })
}

module.exports.comment_create_post = [
    body('text', 'Please insert a text').trim().isLength({min:3}),
    check('email')
        .exists()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email not valid'),
    (req, res, next) => {
        const comment = new Comment({
            email: req.body.email,
            text: req.body.text,
            blog_id: req.params.postId
        })
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            res.json({ errors: errors.array()})
        } else {
            comment.save()
            .then(() => {
                res.json({ message: `Comment by ${comment.email} saved successfully`})
            })
            .catch(err => {
                res.json({ message: 'Comment failed', err})
            })
        }
}]