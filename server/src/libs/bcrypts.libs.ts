import * as bcrypt from "bcryptjs";

export const encrypt = async (
  password: string,
  saltRounds: number = 10
): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

export const compareHash = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
