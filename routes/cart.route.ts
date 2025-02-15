import {Router} from "express";

import { getCart, postCart, postSave ,postDelete } from "../controllers/cart.controller";
import { Cart_validator } from "../validator/CartNumber_valitador";
import { isauth } from "./guards/auth.guard";


const router = Router();

router.get('/' ,isauth, getCart)

router.post('/' ,isauth , Cart_validator(), postCart)
router.post('/save' ,isauth, postSave)
router.post('/delete' ,isauth,postDelete)

export default router;