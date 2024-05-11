import { UserModel } from "../models/user.js";

export class UserController {
    static async getUsers (req,res) {
        const users = await UserModel.getAll()
        console.log(users)
        res.json(users)
    }

    static async createUser(req, res) {
        try {
            const userData = req.body;
            console.log(userData)
            console.log("Hola")
            // Optionally, you can add more client-side validation here if needed
            const result = await UserModel.create(userData);
            console.log(result)
            if (result) {
                res.status(201).json(result);
            } else {
                res.status(500).json({ message: "Failed to create user." });
            }
        } catch (error) {
            res.status(500).json({ message: "Server error while creating user: " + error.message });
        }
    }
}