import jwt from "jsonwebtoken";
import UserModel from "../../models/user.js";
import CommentModal from "../../models/comment.js";
import QuestionModal from "../../models/question.js";
import "dotenv/config";
import UserModal from "../../models/user.js";

const secret = process.env.JWT_SECRET_KEY;

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;

    
    if (token && isCustomAuth) {
      if(req.session.blocked === true) {
        req.userId = null;
        res.status(400).json({ success: false, message: "Bu işlemi gerçekleştiremezsiniz" });
      }
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      const googleId = decodedData?.sub.toString();
      const user = await UserModel.findOne({ googleId });
      req.userId = user?._id;
    }
    next();
  } catch (error) {
    // console.log(error);
  }
};

export const getQuestionOwnerAccess = async (req, res, next) => {
  const user_id = req.userId;
  const { id } = req.params;

  try {
    // console.log(user_id);

    const question = await QuestionModal.findById(id);
    // console.log(question)
    const user = await UserModal.findById(user_id);


    if (user.role === "admin") {
      return next();
    }
    // console.log(question.creator);
    if (question.creator != user_id) {
      return next(
        res.json({ message: "Bu sayfaya erişmeye yetkiniz yok" })
      );
    }  

    return next();
  } catch (error) {
    // console.log(error);
  }
};

export const getCommentOwnerAccess = async (req, res, next) => {
  const user_id = req.userId;
  const { comment_id } = req.params;

  try {
    const comment = await CommentModal.findById(comment_id);

    const user = await UserModal.findById(user_id);
    // console.log(user_id);
    // console.log(comment.creatorId == user_id)

    if (user.role === "admin") {
      return next();
    }

    if (comment.creatorId != user_id) {
      // console.log("errorRrRrRr")
      return next(
        res.json({ message: "Bu sayfaya erişmeye yetkiniz yok" })
      );
    } 
    return next();
  } catch (error) {
    // console.log(error);
  }
};

export const getAdminAccess = async (req, res, next) => {
  const id = req.userId;

  try {
    const user = await UserModel.findById(id);

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Bu sayfaya erişmek için izniniz yok" });
    }

    return next();
  } catch (error) {
    // console.log(error);
  }
};