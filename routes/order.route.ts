import express from "express";
import { getOrders } from "../controllers/order.controller";
import { confirmOrders, deleteAllOrders } from "../controllers/order.controller";
import { isauth } from "./guards/auth.guard";


const router = express.Router();

router.get("/", isauth, getOrders);

router.post("/confirm", isauth, confirmOrders);
router.post("/deleteAll", isauth, deleteAllOrders);


export default router;