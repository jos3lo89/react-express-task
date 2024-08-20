import jwt from "jsonwebtoken";
import { Decoded, Payload } from "../types/express";
class JwtLibs {
  private readonly secret: string;

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error("La variable de entorno JWT_SECRET no está definida");
    }

    this.secret = process.env.JWT_SECRET;
  }

  createToken(Payload: Payload): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(Payload, this.secret, { expiresIn: "1d" }, (err, token) => {
        if (err) return reject(err);
        if (!token) return reject(new Error("No se pudo generar el token"));
        resolve(token);
      });
    });
  }

  verifyToken(token: string): Promise<Decoded> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) return reject(err);
        if (!decoded || typeof decoded !== "object") {
          return reject(new Error("Token inválido"));
        }
        resolve(decoded as Decoded);
      });
    });
  }
}

export default new JwtLibs();
