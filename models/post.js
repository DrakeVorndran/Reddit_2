const mongoose = require('mongoose')

const Post = mongoose.model('post', {
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    title: String,
    url: String,
    summary: String
})

module.exports = Post