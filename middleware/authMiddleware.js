import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/config.js"

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ message: "Token requerido" })

  try {
    req.user = jwt.verify(header.slice(7), JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ message: "Token inválido o caducado" })
  }
}
