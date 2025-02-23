import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { hashPassword, comparePassword } from "../utils/password";

const prisma = new PrismaClient();

export const registerUser = async (
  username: string, 
  password: string
): Promise<User> => {
  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hashPassword(password);
  return prisma.user.create({ 
    data: { username, password: hashedPassword } 
  });
};

export const loginUser = async (
  username: string, 
  password: string
): Promise<string> => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await comparePassword(password, user.password)))
    throw new Error("Invalid credentials");

  return jwt.sign(
    { userId: user.id, username: user.username }, 
    config.jwtSecret, 
    { expiresIn: "1h" }
  );
};
