import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await registerUser(req.body.username, req.body.password);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = await loginUser(req.body.username, req.body.password);
    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
