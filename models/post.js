const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    title: String,
    url: String,
    summary: String,
    subreddit: {
        type: String,
        required: true
    },
    
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]

    
})

PostSchema.pre("save", function (next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;

    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});



module.exports = mongoose.model("Post", PostSchema);
// module.exports = Post