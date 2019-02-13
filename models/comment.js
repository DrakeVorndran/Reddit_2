const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const populate = require("../util/autopopulate");

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

CommentSchema
.pre('findOne', populate('author'))
.pre('find', populate('author'))
.pre('find', populate('comments'))

module.exports = mongoose.model("Comment", CommentSchema);