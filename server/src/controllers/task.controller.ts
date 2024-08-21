import { Request, Response } from "express";
import taskModel from "../models/task.model";
import { HttpStatus, sendError, sendSuccess } from "../utils/requestHandler";

class TaskController {
  async create(req: Request, res: Response) {
    try {
      if (!req.user) {
        throw new Error("User not found");
      }

      const newTask = await taskModel.create(req.body, req.user.id);

      sendSuccess(res, newTask, HttpStatus.CREATED);
    } catch (error: any) {
      if (error instanceof Error) {
        return sendError(res, error.message, HttpStatus.BAD_REQUEST);
      }
      return sendError(res, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const taskDelete = await taskModel.delete(req.params.id);

      sendSuccess(res, taskDelete, HttpStatus.OK);
    } catch (error: any) {
      if (error instanceof Error) {
        return sendError(res, error.message, HttpStatus.BAD_REQUEST);
      }
      return sendError(res, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTasks(req: Request, res: Response) {
    try {
      if (!req.user) {
        throw new Error("No existe usuario");
      }

      const tasks = await taskModel.getTask(req.user.id);
      sendSuccess(res, tasks, HttpStatus.OK);
    } catch (error: any) {
      if (error instanceof Error) {
        return sendError(res, error.message, HttpStatus.BAD_REQUEST);
      }
      return sendError(res, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updateTask = await taskModel.update(req.body, req.params.id);

      sendSuccess(res, updateTask, HttpStatus.OK);
    } catch (error: any) {
      if (error instanceof Error) {
        return sendError(res, error.message, HttpStatus.BAD_REQUEST);
      }
      return sendError(res, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTaskId(req: Request, res: Response) {
    try {
      const task = await taskModel.getTaskId(req.params.id);

      // sendSuccess(res, task, HttpStatus.OK)

      res.status(200).json(task);
    } catch (error: any) {
      if (error instanceof Error) {
        return sendError(res, error.message, HttpStatus.BAD_REQUEST);
      }
      return sendError(res, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export default new TaskController();
