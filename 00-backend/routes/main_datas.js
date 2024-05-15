import { Router } from "express";
import { MainDataController } from "../controllers/main_datas.js";
export const mdRouter = Router()

mdRouter.get('/', MainDataController.getMD)