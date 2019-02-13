const Comment = require('../models/comment');
const Post = require('../models/post');


const express = require('express')
const router = express.Router()
// CREATE Comment

router.post('/posts/:postId/comments', (req, res) => {
    if (req.user) {
        const comment = new Comment(req.body)
        comment.author = req.user
        comment.save()
            .then(comment => {
                Post.findById(req.params.postId)
                    .then(post => {
                        post.comments.unshift(comment)
                        post.save()
                            .then(post => {
                                res.redirect(`/posts/${req.params.postId}`)
                            })
                    })
            })
    }
    else{
        return res.status(401)
    }

})


module.exports = router