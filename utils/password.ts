import { compare, genSalt, hash } from "bcryptjs";

export const saltAndHashPassword = async (password: string) => {
  const salt = await genSalt(10);
  const pwHash = await hash(password, salt);

  return pwHash;
};

export const verifyPassword = async (password: string, pwHash: string) => {
  return await compare(password, pwHash);
};
