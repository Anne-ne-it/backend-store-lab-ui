import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
}