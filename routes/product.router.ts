import {Router} from "express";
import { firstproduct_in_DB_controller, productcontroller } from "../controllers/product.controller";



const router = Router();

router.get('/' , firstproduct_in_DB_controller)

router.get('/:id' , productcontroller)


export default router