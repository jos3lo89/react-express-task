import { Router } from "express";
import userController from "../controllers/user.controller";
import BodyValidator from "../middleware/schema.middleware";
import { loginSchemaZod, registerSchemaZod } from "../schemas/user.schema";
import authMiddleware from "../middleware/auth.middleware";

const route = Router();

// register
route.post(
  "/register",
  BodyValidator.schemaValidator(registerSchemaZod),
  userController.create
);

// login
route.post(
  "/login",
  BodyValidator.schemaValidator(loginSchemaZod),
  userController.login
);

// profile
route.get("/profile", authMiddleware.authValidate, userController.profile);

export default route;
