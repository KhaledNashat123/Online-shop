
import {Router} from "express";
import { authcontroller_getsignup } from "../controllers/auth.controller";
import { authcontroller_postsignup } from "../controllers/auth.controller";

const router = Router();


router.get('/' , authcontroller_getsignup)

router.post('/' , authcontroller_postsignup)

export default router ;