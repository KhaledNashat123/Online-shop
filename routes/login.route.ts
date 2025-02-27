import {Router} from "express";
import { authcontroller_getlogin, authcontroller_logout } from "../controllers/login.controller";
import { authcontroller_postlogin } from "../controllers/login.controller";
import { notauth } from "./guards/auth.guard";


const router = Router();


router.get('/' , notauth ,authcontroller_getlogin)

router.post('/' ,authcontroller_postlogin)

router.post('/logout', authcontroller_logout)

export default router ;