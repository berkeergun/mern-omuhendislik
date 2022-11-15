import CommentModal from "../models/comment.js";
import QuestionModal from "../models/question.js";
import UserModal from "../models/user.js"
import mongoose from "mongoose";

export const addNewCommentToQuestion = async (req, res) => {
  const { id }  = req.params;

  // console.log(req.userId);
  // console.log(id);

  try {

    const user = await UserModal.findById(req.userId);
    const question = await QuestionModal.findById(id);
    const information = req.body;

    // console.log(question);
    // console.log(information);

    const comment = await CommentModal.create({
      ...information,
      // id,
      // user_id,
      creator: user.name,
      creatorId: req.userId,
      createdAt: new Date().toISOString(),
      
      question:question._id
    });

    question.comments.push(comment);

    // console.log(question.comments);

    await question.save();
    await comment.save();

    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    // console.log(error);
  }
};


export const getAllCommentsByQuestion = async (req, res) => {
  const { id } = req.params;
  // const { comments_id } = req.params;

  try {
    const question = await QuestionModal.findById(id);

    const comment = await CommentModal.find().exec();

    // console.log(comment);

    const comments = question.comments;

    const commentData = [];

    for (let i = 0; i < comment.length; i++) {
      if (comments.includes(comment[i]._id)) {
        commentData.push(comment[i]);
      }
    }

    const object = Object.assign([], commentData);

    res.status(200).json({success: true, data: object});
  } catch (error) {
    // console.log(error);
  }
}



export const deleteComment = async (req, res) => {
  const { question_id ,comment_id } = req.params;

  try {

    if (!mongoose.Types.ObjectId.isValid(comment_id)) {
      return res
        .status(404)
        .json({ message: `Böyle bir yorum bulunmamaktadır ${comment_id} ` });
    }

    // const comment = await CommentModal.findByIdAndRemove(comment_id);
    const question = await QuestionModal.findById(question_id);
    const indexOfComment = question.comments.indexOf(comment_id);

    question.comments.splice(indexOfComment, 1);


    await CommentModal.findByIdAndRemove(comment_id);

    await question.save();

    // res.status(200)
    res.json({ message: "Yorum başarıyla silindi" });
    // console.log("Bitirdi")

  } catch (error) {
    // console.log(error);
  }
};


//  - - --  - - - - - --  - - - - - --  - - - - --   ekle

export const updateComment = async(req, res) => {
  const { comment_id } = req.params;
  const { description, imageFile, creator } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(comment_id)) {
      return res
        .status(404)
        .json({ message: `Böyle bir yorum bulunmamaktadır ${comment_id}`  });
    }

    const updatedComment = {
      description,
      imageFile,
      creator,
      _id: comment_id
    }

    // console.log(updatedComment);

    

    await CommentModal.findByIdAndUpdate(comment_id, updatedComment, {new: true});
    const comment = await CommentModal.findById(comment_id);

    // console.log(updatedComment);
    res.json(comment);

  } catch (error) {
    // console.log(error);
  }
}


// export const getCommentsByUser = async (req, res) => {
//   const {user_id} = req.params;

//   try {

//     if (!mongoose.Types.ObjectId.isValid(user_id)) {
//       return res.status(404).json({ message: "User does not exist." });
//     }
//     // const comments = await CommentModal.findOne({creatorId: user_id}).sort({_id: -1});
//     const comments = await CommentModal.find({creatorId: user_id}).sort({_id: -1});
//     // console.log(comments)

//     res.json({status: true, data: comments});

//     // console.log(comments);
//   } catch (error) {
//     console.log(error);
//   }
// }

export const getCommentsByUser = async (req, res) => {
  const { user_id } = req.params;
  const { page } = req.query;

  // console.log(page +" => @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")

  try {
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(404).json({ message: "Böyle bir kullanıcı bulunmamaktadır" });
    }
    // const comments = await CommentModal.findOne({creatorId: user_id}).sort({_id: -1});
    const limit = 9;
    const startIndex = (Number(page) - 1) * limit;
    const total = await CommentModal.countDocuments({ creatorId: user_id });
    const comments = await CommentModal.find({ creatorId: user_id })
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex);
    // console.log(comments)


    res.json({
      status: true,
      data: comments,
      currentUserCommentPage: Number(page),
      totalUserComments: total,
      numberOfUserCommentPages: Math.ceil(total / limit),
    });

    // console.log(comments);
  } catch (error) {
    // console.log(error);
  }
};

export const likeComment = async (req, res) => {
  const { question_id, comment_id } = req.params;
  try {
    if (!req.userId) {
      return res.json({ message: "Beğenmek için lütfen giriş yapınız" });
    }

    if (!mongoose.Types.ObjectId.isValid(question_id) || !mongoose.Types.ObjectId.isValid(comment_id)) {
      return res
        .status(404)
        .json({ message: `Bir şeyler ters gitti` });
    }

    const comment = await CommentModal.findById(comment_id);
    const index = comment.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      comment.likes.push(req.userId);
    } else {
      comment.likes = comment.likes.filter((id) => id !== String(req.userId));
    }

    const updatedComment = await CommentModal.findByIdAndUpdate(
      comment_id,
      comment,
      { new: true }
    );

    res.status(200).json(updatedComment);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Bir şeyler ters gitti" });
      // .json({ message: error.message });
      // console.log(error);
  }   
};