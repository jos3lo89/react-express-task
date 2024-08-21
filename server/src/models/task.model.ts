import { TypeCreateTask, TypeUpdateTask } from "../schemas/task.schema";
import prisma from "../config/db";

class TaskModel {
  private prisma = prisma;

  async create(task: TypeCreateTask, authorId: string) {
    const newTask = this.prisma.task.create({
      data: {
        ...task,
        author_id: authorId,
      },
    });

    if (!newTask) {
      throw new Error("No se pudo crear la tarea");
    }

    return newTask;
  }

  async delete(id: string) {
    try {
      const taskDelete = await this.prisma.task.delete({
        where: {
          id,
        },
      });

      return taskDelete;
    } catch (error) {
      throw new Error("no existe la tarea");
    }
  }

  async getTask(idUser: string) {
    try {
      const tasks = await this.prisma.task.findMany({
        where: {
          author_id: idUser,
        },
      });
      return tasks;
    } catch (error) {
      throw new Error("No se pudo obetner las tareas");
    }
  }

  async update(task: TypeUpdateTask, id: string) {
    try {
      const updateTask = await this.prisma.task.update({
        where: { id },
        data: {
          ...task,
        },
      });

      return updateTask;
    } catch (error) {
      throw new Error("no se pudo actualizar la tarea");
    }
  }

  async getTaskId(id: string){
    try {
      const task = await this.prisma.task.findFirst({where: {
        id
      }})

      return task
    } catch (error) {
      throw new Error("No se pudo obtener la tarea")
    }
  }
}

export default new TaskModel();
