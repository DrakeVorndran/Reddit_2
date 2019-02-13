const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');


const express = require('express')
const router = express.Router()
// CREATE Comment

router.post('/posts/:postId/comments', (req, res) => {
    if (req.user) {
        const comment = new Comment(req.body)
        comment.author = req.user
        comment.save()
            .then(comment => {
                User.findById(comment.author).then(user => {
                    user.comments.unshift(comment._id)
                    user.save()
                        .then(user => {
                            Post.findById(req.params.postId)
                                .then(post => {
                                    post.comments.unshift(comment)
                                    post.save()
                                        .then(post => {
                                            res.redirect(`/posts/${req.params.postId}`)
                                        })
                                })
                        })
                })
            })
    } else {
        return res.status(401)
    }

})


module.exports = router