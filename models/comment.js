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
    ref: 'author',
    required: true
  }
});

CommentSchema
// .pre('findOne', populate('author'))
// .pre('find', populate('author'))

module.exports = mongoose.model("Comment", CommentSchema);