import { NextFunction, Request, Response } from "express";
import jwtLibs from "../libs/jwt.libs";
import { HttpStatus, sendError } from "../utils/requestHandler";

class AuthMiddleware {
  async authValidate(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new Error("No hay encabezado Authorization");
      }
      const tokenArray = authHeader.split(" ");
      if (tokenArray.length !== 2 || tokenArray[0] !== "Bearer") {
        throw new Error("El formato del token no es válido");
      }
      const token = tokenArray[1];

      if (!token) throw new Error("No existe el token");

      const decoded = await jwtLibs.verifyToken(token);

      const { iat, exp, ...payload } = decoded;

      req.user = payload;

      next();
    } catch (error: any) {
      if (error instanceof Error) {
        return sendError(res, error.message, HttpStatus.BAD_REQUEST);
      }

      return sendError(res, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /*   private extractToken(req: Request): string | null {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return null; // No hay encabezado Authorization
    }

    const tokenArray = authHeader.split(" ");
    if (tokenArray.length !== 2 || tokenArray[0] !== "Bearer") {
      return null; // El formato del token no es válido
    }

    return tokenArray[1]; // Devuelve el token
  } */

  // ---> no puedo instanciar otro metodos de la misma clase
}

export default new AuthMiddleware();
