import { Request, Response } from "express";
import { HttpStatus, sendError, sendSuccess } from "../utils/requestHandler";
import userModel from "../models/user.model";
import jwtLibs from "../libs/jwt.libs";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const newUser = await userModel.create({ ...req.body });

      const { password: _, ...userWithoutPassword } = newUser;

      const payload = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };

      const token = await jwtLibs.createToken(payload);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
      });

      sendSuccess(res, { ...userWithoutPassword, token }, HttpStatus.CREATED);
    } catch (error) {
      if (error instanceof Error) {
        return sendError(res, [error.message], HttpStatus.BAD_REQUEST);
      }
      return sendError(
        res,
        "Internal server error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async login(req: Request, res: Response) {
    try {
      const userFound = await userModel.login({
        ...req.body,
      });

      const { password: _, photo, ...payload } = userFound;

      const token = await jwtLibs.createToken(payload);

      res.cookie("token", token, {
        secure: false,
        httpOnly: true,
        sameSite: "none",
      });

      sendSuccess(res, { ...payload, photo, token }, HttpStatus.OK);
    } catch (error) {
      if (error instanceof Error) {
        return sendError(res, [error.message], HttpStatus.BAD_REQUEST);
      }
      return sendError(
        res,
        "Internal server error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async profile(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("No user");

      const userData = await userModel.profile(req.user.id);

      const { password: _, ...userWithoutPassword } = userData;

      sendSuccess(res, userWithoutPassword, HttpStatus.OK);
    } catch (error) {
      if (error instanceof Error) {
        return sendError(res, [error.message], HttpStatus.BAD_REQUEST);
      }
      return sendError(
        res,
        "Internal server error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default new UserController();
