const Post = require('../models/post');
const Comment = require('../models/comment');

// CREATE Comment
module.exports = (app) => {

    app.post('/posts/:postId/comments', (req, res) => {
        const comment = new Comment(req.body)
        comment.save()
            .then(comment => {
                Post.findById(req.params.postId)
                .then(post => {
                    console.log(post)
                    post.comments.unshift(comment)
                    post.save()
                    .then(() => {
                        res.redirect(`/posts/${req.params.postId}`)
                    })
                })
            })

    })

}