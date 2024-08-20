import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import BodyValidator from "../middleware/schema.middleware";
import { createTaskSchemaZod, updateTaskSchemaZod } from "../schemas/task.schema";
import taskController from "../controllers/task.controller";

const route = Router();

// Create
route.post(
  "/create",
  authMiddleware.authValidate,
  BodyValidator.schemaValidator(createTaskSchemaZod),
  taskController.create
);

// Delete
route.delete("/delete/:id", authMiddleware.authValidate, taskController.delete);

// Get user Tasks
route.get("/", authMiddleware.authValidate, taskController.getTasks);

// Update
route.put("/update/:id", authMiddleware.authValidate, BodyValidator.schemaValidator(updateTaskSchemaZod), taskController.update)

export default route;
