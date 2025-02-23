"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const password_1 = require("../utils/password");
const prisma = new client_1.PrismaClient();
const registerUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma.user.findUnique({ where: { username } });
    if (existingUser)
        throw new Error("User already exists");
    const hashedPassword = yield (0, password_1.hashPassword)(password);
    return prisma.user.create({
        data: { username, password: hashedPassword }
    });
});
exports.registerUser = registerUser;
const loginUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({ where: { username } });
    if (!user || !(yield (0, password_1.comparePassword)(password, user.password)))
        throw new Error("Invalid credentials");
    return jsonwebtoken_1.default.sign({ userId: user.id, username: user.username }, env_1.config.jwtSecret, { expiresIn: "1h" });
});
exports.loginUser = loginUser;
