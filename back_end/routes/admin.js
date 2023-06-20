import express from "express";
import { update_shop_brand } from "../controllers/admin/update_shop";

const router = express.Router();

//post
router.post('/brandToday', update_shop_brand)


export default router;
