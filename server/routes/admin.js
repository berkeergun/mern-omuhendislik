import express from "express";
const router = express.Router();

import { auth, getAdminAccess } from "../middleware/authorization/auth.js";
 
import {
    getAllUsers,
    deleteUser,
    getUserById,
    getBlockUser,
    getUserBySearch
  } from "../controllers/admin.js";


// router.get("/getLoggedInUser", [auth, getAdminAccess], getLoggedInUser);
router.get("/getAllUsers", [auth, getAdminAccess], getAllUsers);
router.get("/getUserById/:id", [auth, getAdminAccess], getUserById);
router.get("/getUserBySearch", [auth, getAdminAccess], getUserBySearch);
router.delete("/deleteUserById/:id", [auth, getAdminAccess], deleteUser);
router.patch("/blockUser/:id", [auth, getAdminAccess], getBlockUser);


export default router;