import {Router} from "express";
import { productcontroller } from "../controllers/product.controller";



const router = Router();


router.get('/:id' , productcontroller)


export default router