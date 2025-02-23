import { PrismaClient, Task } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (userId: number): Promise<Task[]> => {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { id: 'desc' }  // Latest tasks first
  });
};

export const createTask = async (
  userId: number,
  title: string,
  description?: string
): Promise<Task> => {
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
};

export const updateTask = async (
    taskId: number, 
    userId: number, 
    data: Partial<Task>
): Promise<Task | null> => {
    const task = await prisma.task.findUnique({
      where: { id: taskId, userId },
    });
  
    if (!task) return null; // Unauthorized or not found
  
    return prisma.task.update({
      where: { id: taskId },
      data,
    });
  };
  

export const deleteTask = async (taskId: number, userId: number): Promise<boolean> => {
  const deleted = await prisma.task.deleteMany({
    where: { id: taskId, userId }, // Ensures user owns the task
  });

  return deleted.count > 0;
}; 