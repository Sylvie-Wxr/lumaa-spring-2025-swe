import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

interface JwtPayload {
  userId: number;
  username: string;
}

// Extend Express Request type to include user
declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer TOKEN"

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    req.user = jwt.verify(token, config.jwtSecret) as JwtPayload;
    next();
  } catch {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
