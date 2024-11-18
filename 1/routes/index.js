import {Router} from "express";
import productRouter from "./productRouter.js";
import shopRouter from "./shopRouter.js";
import stockRouter from "./stockRouter.js";
import operationsRouter from "./operationsRouter.js";

const router = new Router();


router.use('/products', productRouter );
router.use('/shops', shopRouter )
router.use('/stocks', stockRouter )
router.use('/history', operationsRouter )

export default router;