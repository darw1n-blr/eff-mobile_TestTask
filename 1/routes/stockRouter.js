import {Router} from "express";
import stockController from "../controllers/stockController.js";

const router = new Router();

router.post('/', stockController.addStock)

router.patch('/shelf/', stockController.updateShelfAmount)

router.patch('/order/', stockController.updateOrderAmount)

router.get('/', stockController.getStocks)


export default router;