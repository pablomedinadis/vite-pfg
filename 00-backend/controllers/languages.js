import { LanguageModel } from "../models/language.js";

export class LanguageController {
    static async getLang (req,res) {
        const languages = await LanguageModel.getAll()
        console.log(languages)
        res.json(languages)
    }
}