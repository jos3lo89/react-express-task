import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { HttpStatus, sendError } from "../utils/requestHandler";

class BodyValidator {
  schemaValidator =
    (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        const body =
          Object.getPrototypeOf(req.body) === null ? { ...req.body } : req.body;

        schema.parse(body);
        next();
      } catch (error: any) {
        if (error instanceof ZodError) {
          return sendError(
            res,
            error.errors.map((e) => e.message),
            HttpStatus.BAD_REQUEST
          );
        }

        return sendError(res, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    };
}

export default new BodyValidator();
