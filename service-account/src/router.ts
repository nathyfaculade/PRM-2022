import { Router } from "express";
import AuthController from "./controller/AuthController";

//instancio o router do express
const router = Router();

//rotas das brand 
router.post('/admin/signin', AuthController.signInAdmin);


export default router;