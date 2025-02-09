import {Router} from "express";
import { authcontroller_getlogin, authcontroller_logout } from "../controllers/login.controller";
import { authcontroller_postlogin } from "../controllers/login.controller";


const router = Router();


router.get('/' , authcontroller_getlogin)

router.post('/' ,authcontroller_postlogin)

router.post('/logout', authcontroller_logout)

export default router ;