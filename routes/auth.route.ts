
import {Router} from "express";
import { authcontroller_getsignup } from "../controllers/auth.controller";
import { authcontroller_postsignup } from "../controllers/auth.controller";
import { user_validator } from "../validator/create.user.validator";
import { notauth } from "./guards/auth.guard";

const router = Router();


router.get('/' ,notauth, authcontroller_getsignup)

router.post('/' ,user_validator() ,authcontroller_postsignup)

export default router ;