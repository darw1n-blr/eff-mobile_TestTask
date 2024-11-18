import {Router} from "express";
import shopController from "../controllers/shopController.js";

const router = new Router();


router.post('/', shopController.createShop)


export default router;