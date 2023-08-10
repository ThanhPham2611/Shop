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
import { like_comment } from "../controllers/user/like_comment";
import { get_like_comment } from "../controllers/user/get_like_comment";
import { add_cart } from "../controllers/user/add_cart";
import { get_cart } from "../controllers/user/get_cart";
import { update_cart } from "../controllers/user/update_cart";
import { update_online } from "../controllers/user/update_online";
import { get_info_shop } from "../controllers/user/get_info_shop";
import { room_message } from "../controllers/user/room_message";
import { get_message } from "../controllers/user/get_message";
import { forgot_password } from "../controllers/auth/forgot";
import { change_password } from "../controllers/auth/change_password";
import { update_profile } from "../controllers/user/update_profile";
import { create_payment_vnpay } from "../controllers/payment/vnpay";
import { add_card } from "../controllers/user/add_card";
import { get_card } from "../controllers/user/get_card";
import { update_card } from "../controllers/user/update_card";

const router = express.Router();

//get
router.get("/profile", get_profile);
router.get("/mall", get_brand_day);
router.get("/product/:id", get_product_detail);
router.get("/comment/:id", get_comment_product);
router.get("/like/:productId", get_like_comment);
router.get('/cart', get_cart);
router.get('/shop_info/:produtId', get_info_shop);
router.get('/room_message', room_message);
router.get('/get_message/:to', get_message);
router.get('/card', get_card);

//post
router.post("/register", register_user);
router.post("/login", login_user);
router.post('/forgot', forgot_password);
router.post("/verify_email", verify_register);
router.post("/verify_code", verify_code);
router.post('/change_password', change_password);
router.post("/comment", comment_product);
router.post("/like", like_comment);
router.post("/add_cart", add_cart);
router.post("/update_cart", update_cart);
router.post('/logout', update_online);
router.post('/update_profile', update_profile);
router.post('/add_card', add_card);
router.post('/card/update', update_card);
router.post('/create_payment_url', create_payment_vnpay);

export default router;
