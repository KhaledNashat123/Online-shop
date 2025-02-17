import express from "express";
import { getManageOrder, getOrders, updateOrderStatus } from "../controllers/order.controller";
import { confirmOrders, deleteAllOrders } from "../controllers/order.controller";
import { isauth } from "./guards/auth.guard";
import { isAdmin } from "./guards/admin.guard";


const router = express.Router();

router.get("/", isauth, getOrders);

router.get("/manage-orders", isauth,isAdmin, getManageOrder);

router.post("/manage-orders", isauth,isAdmin, confirmOrders);

router.post("/updateStatus/:orderId", isauth, updateOrderStatus);
router.post("/deleteAll", isauth, deleteAllOrders);




export default router;