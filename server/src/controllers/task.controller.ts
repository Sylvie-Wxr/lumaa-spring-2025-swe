import { Request, Response } from "express";
import * as taskService from "../services/task.service";

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const tasks = await taskService.getTasks(userId);
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to retrieve tasks", error: error.message });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { title, description } = req.body;

    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    const task = await taskService.createTask(userId, title, description);
    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to create task", error: error.message });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const updatedTask = await taskService.updateTask(Number(id), userId, req.body);
    if (!updatedTask) {
      res.status(404).json({ message: "Task not found or unauthorized" });
      return;
    }

    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to update task", error: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const deleted = await taskService.deleteTask(Number(id), userId);
    if (!deleted) {
      res.status(404).json({ message: "Task not found or unauthorized" });
      return;
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to delete task", error: error.message });
  }
};
