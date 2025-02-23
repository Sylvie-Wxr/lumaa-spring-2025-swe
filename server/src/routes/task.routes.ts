import express from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/task.controller";

const router = express.Router();

// Apply authentication to all task routes
router.use(authenticateToken);

// Task routes
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router; 