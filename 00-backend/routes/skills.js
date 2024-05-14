import { Router } from "express";
import { SkillController } from "../controllers/skills.js"
export const skillRouter = Router()

skillRouter.get("/", SkillController.getSkill)