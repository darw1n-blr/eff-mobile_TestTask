import {Router} from "express";
import operationsController from "../controllers/operationsController.js";

const router = new Router();


router.get('/', operationsController.getOperationsHistory)


export default router;