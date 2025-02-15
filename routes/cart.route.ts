import {Router} from "express";

import { getCart, postCart } from "../controllers/cart.controller";
import { Cart_validator } from "../validator/CartNumber_valitador";
import { isauth } from "./guards/auth.guard";


const router = Router();

router.get('/' , getCart)

router.post('/' ,isauth , Cart_validator(), postCart)

export default router;