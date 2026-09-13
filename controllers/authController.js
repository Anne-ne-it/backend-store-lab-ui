import { getCurrentUser, loginUser, registerUser } from "../services/authServices.js"

const cookieOptions = [
  "HttpOnly",
  "Path=/",
  `Max-Age=${7 * 24 * 60 * 60}`,
  process.env.NODE_ENV === "production" ? "SameSite=None" : "SameSite=Lax",
  ...(process.env.NODE_ENV === "production" ? ["Secure"] : []),
].join("; ")

const clearCookie = ["token=", "HttpOnly", "Path=/", "Max-Age=0", "SameSite=Lax", ...(process.env.NODE_ENV === "production" ? ["Secure"] : [])].join("; ")

export async function register(req, res, next) {
  try {
    const data = await registerUser(req.body)
    res.setHeader("Set-Cookie", `token=${encodeURIComponent(data.token)}; ${cookieOptions}`)
    delete data.token
    res.status(201).json({ data })
  } catch (error) { next(error) }
}

export async function login(req, res, next) {
  try {
    const data = await loginUser(req.body)
    res.setHeader("Set-Cookie", `token=${encodeURIComponent(data.token)}; ${cookieOptions}`)
    delete data.token
    res.json({ data })
  } catch (error) { next(error) }
}

export function logout(req, res) {
  res.setHeader("Set-Cookie", clearCookie)
  res.json({ message: "Sesión cerrada" })
}

export async function me(req, res, next) {
  try { res.json({ data: await getCurrentUser(req.user.id) }) }
  catch (error) { next(error) }
}