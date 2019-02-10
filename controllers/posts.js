const Post = require('../models/Post')

module.exports = function (app) {

    //Subreddit GET
    app.get('/n/:subreddit', (req, res) => {
        Post.find({ subreddit: req.params.subreddit }).then((posts) => {
            res.render('posts-index', { posts })
        })
    })

    //Posts-index GET
    app.get('/posts', (req, res) => {
        Post.find().then((posts) => {
            res.render('posts-index', {posts: posts})
        }).catch(err => {
            console.log(err)
        })
    })
    
    //Posts-new GET
    app.get('/posts/new', (req, res) => {
        res.render('posts-new')
    })

    //Posts-new POST
    app.post('/posts/new', (req, res) => {
        const post = new Post(req.body)

        post.save((err, post) => {
            return(res.redirect('/'))
        })
    })

    //Posts-show GET
    app.get('/posts/:id', (req, res) => {
        Post.findById(req.params.id).then((post) => {
            res.render('posts-show', {post: post})
        }).catch(err => {
            console.log(err)
        })
    })

}