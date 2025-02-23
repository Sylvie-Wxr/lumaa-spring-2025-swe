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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTasks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.task.findMany({
        where: { userId },
        orderBy: { id: 'desc' } // Latest tasks first
    });
});
exports.getTasks = getTasks;
const createTask = (userId, title, description) => __awaiter(void 0, void 0, void 0, function* () {
    if (!title) {
        throw new Error("Title is required");
    }
    return prisma.task.create({
        data: {
            title: title,
            description: description || null,
            userId
        }
    });
});
exports.createTask = createTask;
const updateTask = (taskId, userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield prisma.task.findUnique({
        where: { id: taskId, userId },
    });
    if (!task)
        return null; // Unauthorized or not found
    return prisma.task.update({
        where: { id: taskId },
        data,
    });
});
exports.updateTask = updateTask;
const deleteTask = (taskId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield prisma.task.deleteMany({
        where: { id: taskId, userId }, // Ensures user owns the task
    });
    return deleted.count > 0;
});
exports.deleteTask = deleteTask;
