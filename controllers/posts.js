const Post = require('../models/post')
const Comment = require('../models/comment')
const express = require('express')
const router = express.Router()

//Subreddit GET
router.get('/n/:subreddit', (req, res) => {
    Post.find({
        subreddit: req.params.subreddit
    }).then((posts) => {
        res.render('posts-index', {
            posts
        })
    })
})

//Posts-index GET
router.get('/posts', (req, res) => {
    Post.find().then((posts) => {
        res.render('posts-index', {
            posts: posts
        })
    }).catch(err => {
        console.log(err)
    })
})

//Posts-new GET
router.get('/posts/new', (req, res) => {
    res.render('posts-new')
})

//Posts-new POST
router.post('/posts/new', (req, res) => {
    const post = new Post(req.body)

    post.save((err, post) => {
        return (res.redirect('/'))
    })
})

//Posts-show GET
router.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).populate('comments').then((post) => {
        res.render('posts-show', {
            post: post
        })
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router