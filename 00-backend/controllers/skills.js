import { SkillModel } from "../models/skill.js";

export class SkillController {
    static async getSkill (req,res) {
        const skills = await SkillModel.getAll()
        console.log(skills)
        res.json(skills)
    }
}