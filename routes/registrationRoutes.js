import express from "express";
import {registerUser,loginUser } from "../controller/registrationController.js";

// router object
const router = express.Router();

router.post("/registration",registerUser)
router.post("/login",loginUser)

// export
export default router;
