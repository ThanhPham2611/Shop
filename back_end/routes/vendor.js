import express from "express";

import { create_shop } from "../controllers/vendor/create_shop";
import { create_product } from "../controllers/vendor/create_product";

const router = express.Router();

//get


//post
router.post('/shop', create_shop);
router.post('/product', create_product);

export default router;