import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  creator: String,
  tags: [String],

  imageFile: {
    type:Array,
  },

  // imageFile: String,

  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});
const QuestionModal = mongoose.model('Question', questionSchema);

export default QuestionModal;
