const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')
const express = require('express')
const router = express.Router()


//Subreddit GET
router.get('/n/:subreddit', (req, res) => {
    const currentUser = req.user
    Post.find({
            subreddit: req.params.subreddit
        }).lean()
        .then((posts) => {
            res.render('posts-index', {
                posts,
                currentUser
            })
        })
})

//Posts-index GET
router.get('/posts', (req, res) => {
    const currentUser = req.user
    Post.find().lean()
    .then((posts) => {
        res.render('posts-index', {
            posts,
            currentUser

        })
    }).catch(err => {
        console.log(err)
    })
})

//Posts-new GET
router.get('/posts/new', (req, res) => {
    const currentUser = req.user
    res.render('posts-new', {
        currentUser
    })
})

//Posts-new POST
router.post('/posts/new', (req, res) => {
    if(req.user) {
        const post = new Post(req.body)
        post.author = req.user._id
        post
        .save()
        .then((post) => {
            User.findById(post.author).then(user => {
                user.posts.unshift(post._id)
                user.save()
                .then(user => {
                    return (res.redirect(`/posts/${post._id}`))
                })
            })
        })
    }
    else {
        return res.status(401)
    }
})

//Posts-show GET
router.get('/posts/:id', (req, res) => {
    const currentUser = req.user
    Post.findById(req.params.id).populate('comments').lean()
        .then((post) => {
            res.render('posts-show', {
                post,
                currentUser
            })
        }).catch(err => {
            console.log(err)
        })
})

module.exports = router