import express from "express";
const router = express.Router();
import { auth } from "../middleware/authorization/auth.js";

import {
  signup,
  signin,
  resetLoggedInUserPassword,
  resetPassword,
  forgotPassword,
  getLoggedInUser
} from "../controllers/user.js";


router.post("/signup", signup);
router.post("/signin", signin);
router.get("/", auth, getLoggedInUser);
// router.post("/googleSignIn", googleSignIn);
router.put("/resetLoggedInUserPassword", auth, resetLoggedInUserPassword);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword", resetPassword);



export default router;
