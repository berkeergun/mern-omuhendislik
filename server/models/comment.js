import mongoose from "mongoose";


const commentSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now
  // },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  imageFile: {
    type: String,
  },
  creator: {
    // type: mongoose.Schema.Types.ObjectId,
    type: mongoose.Schema.Types.String,
    ref: 'User'
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: 
    {
      type: [String],
      default: []
    }
  ,
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  // question: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Question'
  // }],
});

const CommentModal = mongoose.model('Comment', commentSchema);

export default CommentModal;
