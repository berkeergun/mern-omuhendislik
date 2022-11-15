import express from "express";
const router = express.Router();
import {
  auth,
  getCommentOwnerAccess,
  getQuestionOwnerAccess,
} from "../middleware/authorization/auth.js";

import {
  createQuestion,
  getQuestions,
  getQuestion,
  getQuestionsByUser,
  deleteQuestion,
  updateQuestion,
  getQuestionsBySearch,
  getQuestionsByTag,
  getRelatedQuestions,
  likeQuestion,
} from "../controllers/question.js";

import {
  addNewCommentToQuestion,
  getAllCommentsByQuestion,
  deleteComment,
  updateComment,
  getCommentsByUser,
  likeComment
} from "../controllers/comment.js";

// router.use("/:id/comment", comment);
router.post("/:id/comment", auth, addNewCommentToQuestion);
router.get("/:id/comment", getAllCommentsByQuestion);

router.get("/:user_id/comments", auth, getCommentsByUser);
router.patch(
  "/:question_id/comment/:comment_id",
  [auth, getCommentOwnerAccess ],
  updateComment
);
router.delete(
  "/:question_id/comment/:comment_id",
  [auth, getCommentOwnerAccess],
  deleteComment
);

router.get("/search", getQuestionsBySearch); // sıkıntı
router.get("/tag/:tag", getQuestionsByTag);
router.post("/relatedQuestions", getRelatedQuestions);
router.get("/", getQuestions);
router.get("/:id", getQuestion);

router.post("/", auth, createQuestion);
router.delete("/:id", [auth, getQuestionOwnerAccess], deleteQuestion);
router.patch("/:id", [auth, getQuestionOwnerAccess], updateQuestion);
router.get("/userQuestions/:id", auth, getQuestionsByUser);
router.patch("/like/:id", auth, likeQuestion);
router.patch("/:question_id/comment/like/:comment_id", auth, likeComment);

export default router;
