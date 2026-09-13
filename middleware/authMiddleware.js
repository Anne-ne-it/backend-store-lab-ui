import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/config.js"

function getTokenFromCookie(req) {
  const cookieHeader = req.headers.cookie || ""
  const cookies = cookieHeader.split(";").reduce((result, part) => {
    const [key, ...value] = part.trim().split("=")
    if (key) result[key] = decodeURIComponent(value.join("="))
    return result
  }, {})
  return cookies.token || null
}

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  const token = header?.startsWith("Bearer ") ? header.slice(7) : getTokenFromCookie(req)
  if (!token) return res.status(401).json({ message: "Sesión requerida" })

  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ message: "Sesión inválida o caducada" })
  }
}