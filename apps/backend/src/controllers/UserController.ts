import { Request, Response } from "express";
import User from "../models/User";



export class UserController {

    static async create(req: Request, res: Response) {
        try {
            const {  name, email,phoneNumber,role, password,uid } = req.body;
            
            if (!name || !email || !phoneNumber || !role) {
                return res.status(400).json({
                    error: "Missing required fields",
                    message: "Name, email and tel are required"
                });
            }

            const user = new User();
            const userId = await user.create({
                name,
                email,
                phoneNumber,
                role,
                password,
                uid,
                status: 'active',
            });

            res.status(201).json({
                message: "user created successfully",
                uid: userId
            });

        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({
                error: "Internal server error",
                message: "Failed to create user"
            });
        }
    }

    static async updatePassword(req: Request, res: Response) {
        try {
       
            const { uid,newPassword } = req.body;
    
            if (!uid || !newPassword) {
                return res.status(400).json({
                    error: "Missing required fields",
                    message: "UID and new password are required"
                });
            }
    
            const user = new User();
            const result = await user.updatePass(uid,newPassword);
    
            if (!result) {
                return res.status(404).json({
                    error: "User not found",
                    message: "No user found with the provided UID"
                });
            }
            res.status(200).json({
                message: "Password updated successfully"
            });
    
        } catch (error) {
            console.error('Error updating password:', error);
            res.status(500).json({
                error: "Internal server error",
                message: "Failed to update password"
            });
        }
    }
    
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email, phoneNumber, role, password } = req.body;
    
            if (!id) {
                return res.status(400).json({
                    error: "Missing user ID",
                    message: "User ID is required for update"
                });
            }
    
            if (!name && !email && !phoneNumber && !role && !password) {
                return res.status(400).json({
                    error: "Missing fields to update",
                    message: "At least one field (name, email, phoneNumber, role, password) must be provided"
                });
            }
    
            const user = new User();
            const updated = await user.update(id, {
                name,
                email,
                phoneNumber,
                role,
                password
            });
    
            if (!updated) {
                return res.status(404).json({
                    error: "User not found",
                    message: "No user found with the given ID"
                });
            }
    
            res.status(200).json({
                message: "User updated successfully"
            });
    
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({
                error: "Internal server error",
                message: "Failed to update user"
            });
        }
    }
    

    static async getAll(req: Request, res: Response) {
        try {
            const user = new User();
            const users = await user.findAll();
            res.status(200).json({ users });
        } catch (error) {
            console.error('Error fetching reports:', error);
            res.status(500).json({
                error: "Internal server error",
                message: "Failed to fetch reports"
            });
        }
    }

    static async getById(req: Request, res: Response) {
        const {uid} = req.params;
        try {
            const user = new User();
            const userData = await user.findById(uid);
            res.status(200).json({ userData });
        } catch (error) {
            console.error('Error fetching reports:', error);
            res.status(500).json({
                error: "Internal server error",
                message: "Failed to fetch reports"
            });
        }
    }
    static async claimed(req: Request, res: Response) {
        const {uid,claimcode} = req.body;
        try {
            const user = new User();
            const userData =  await user.updateRewardStatus(uid, claimcode, 'claimed');;
           
            res.status(200).json(userData);
        } catch (error) {
            console.error('Error fetching reports:', error);
            res.status(500).json({
                error: "Internal server error",
                message: "Failed to fetch reports"
            });
        }
    }

    static async blockUser(req: Request, res: Response) {
        const {uid} = req.params;
        try {
            const user = new User();
            const userData = await user.block(uid);
            res.status(200).json({ userData });
        } catch (error) {
            console.error('Error fetching reports:', error);
            res.status(500).json({
                error: "Internal server error",
                message: "Failed to fetch reports"
            });
        }
    }


}