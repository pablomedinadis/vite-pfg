import { MainDataModel } from "../models/main_data.js"

export class MainDataController {
    static async getMD (req,res) {
        const md = await MainDataModel.getAll()
        console.log(md)
        res.json(md)
    }
}