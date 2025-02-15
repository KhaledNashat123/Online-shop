import {Router} from "express";
import { getHome } from "../controllers/home.controller";
import { isauth_home } from "./guards/auth.guard";


const router = Router();

router.get('/' ,isauth_home,getHome)


export default router ;
