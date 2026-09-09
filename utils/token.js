import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/config.js"

export function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "2h" },
  )
}
