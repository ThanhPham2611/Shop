import express from "express";
import { register_user } from "../controllers/auth/register";
import { login_user } from "../controllers/auth/login";

const router = express.Router();

//get

//post
router.post('/register', register_user);
router.post('/login', login_user);

export default router;
