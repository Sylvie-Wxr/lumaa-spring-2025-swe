"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Extract token from "Bearer TOKEN"
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    try {
        req.user = jsonwebtoken_1.default.verify(token, env_1.config.jwtSecret);
        next();
    }
    catch (_b) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
exports.authenticateToken = authenticateToken;
