import prisma from "../config/db";
import { compareHash, encrypt } from "../libs/bcrypts.libs";
import { LoginType, RegisterType } from "../schemas/user.schema";

class UserModel {
  private prisma = prisma;

  async create(userData: RegisterType) {
    const hash = await encrypt(userData.password);

    const newUser = await this.prisma.user.create({
      data: {
        ...userData,
        password: hash,
      },
    });

    if (!newUser) {
      throw new Error("Usuario no creado");
    }

    return newUser;
  }

  async login(loginData: LoginType) {
    const userFound = await this.prisma.user.findFirst({
      where: { email: loginData.email },
    });

    if (!userFound) {
      throw new Error("Usuario no existe");
    }

    const isMatchPassword = await compareHash(
      loginData.password,
      userFound.password
    );

    if (!isMatchPassword) {
      throw new Error("El email o contraseña no coinciden");
    }

    return userFound;
  }

  async profile(id: string) {
    const userFound = await this.prisma.user.findFirst({ where: { id } });

    if (!userFound) {
      throw new Error("Usuario no encontrado");
    }

    return userFound;
  }
}

export default new UserModel();
