import {Router} from "express";
import { authcontroller_getlogin } from "../controllers/login.controller";
import { authcontroller_postlogin } from "../controllers/login.controller";


const router = Router();


router.get('/' , authcontroller_getlogin)

router.post('/' ,authcontroller_postlogin)

export default router ;