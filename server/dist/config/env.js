"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables");
}
exports.config = {
    jwtSecret: process.env.JWT_SECRET || "d4f1a8b927c3e5f6d29a7e3f14b2c9d85e6a41d37c5f7d2b39e6f8a21c5d7e8f",
    databaseUrl: process.env.DATABASE_URL,
    port: parseInt(process.env.PORT || "5120", 10)
};
