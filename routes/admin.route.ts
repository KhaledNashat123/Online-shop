import {Router} from "express";
import { isAdmin } from "./guards/admin.guard";
import { post_AddProduct, get_AddProduct } from "../controllers/admin.controller";
import multer from "multer";



const router = Router();

router.get("/add" , isAdmin, get_AddProduct)

router.post(
    "/add",
    isAdmin,
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "images");
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + "-" + file.originalname);
            }
        })
    }).single("image") , post_AddProduct)


export default router