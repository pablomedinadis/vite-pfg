import { Router } from "express";
import { LanguageController } from "../controllers/languages.js";
export const languageRouter = Router()

languageRouter.get('/', LanguageController.getLang)