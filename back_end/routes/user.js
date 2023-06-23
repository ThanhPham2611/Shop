import express from "express";
import { register_user } from "../controllers/auth/register";
import { login_user } from "../controllers/auth/login";
import { verify_register } from "../controllers/auth/verify_register";
import { verify_code } from "../controllers/auth/verify_code";
import { get_profile } from "../controllers/user/get_profile";
import { get_brand_day } from "../controllers/user/get_brand_day";
import { get_product_detail } from "../controllers/user/get_product_detail";
import { comment_product } from "../controllers/user/comment_product";
import { get_comment_product } from "../controllers/user/get_comment_product";

const router = express.Router();

//get
router.get('/profile', get_profile);
router.get('/mall', get_brand_day);
router.get('/product/:id', get_product_detail);
router.get('/comment/:id', get_comment_product);

//post
router.post('/register', register_user);
router.post('/login', login_user);
router.post('/verify_email', verify_register);
router.post('/verify_code', verify_code);
router.post('/comment', comment_product);

export default router;
