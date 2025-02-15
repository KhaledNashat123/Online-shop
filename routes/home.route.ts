import {Router} from "express";
import { getHome } from "../controllers/home.controller";
import { isauth } from "./guards/auth.guard";


const router = Router();

router.get('/' ,isauth,getHome)


export default router ;
