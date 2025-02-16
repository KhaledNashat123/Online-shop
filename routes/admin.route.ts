import {Router} from "express";
import { isAdmin } from "./guards/admin.guard";
import { get_AddProduct } from "../controllers/admin.controller";



const router = Router();

router.get("/add" , isAdmin, get_AddProduct)


export default router