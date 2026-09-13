import bcrypt from "bcryptjs"
import prisma from "../lib/prisma.js"
import { createToken } from "../utils/token.js"

function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    createdAt: user.createdAt,
  }
}

export async function registerUser({ email, password, username }) {
  const normalizedEmail = String(email || "").trim().toLowerCase()
  const normalizedUsername = String(username || "").trim() || normalizedEmail.split("@")[0]

  if (!normalizedEmail || !password) {
    const error = new Error("Email y contraseña son obligatorios")
    error.status = 400
    throw error
  }
  if (String(password).length < 6) {
    const error = new Error("La contraseña debe tener al menos 6 caracteres")
    error.status = 400
    throw error
  }

  const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } })
  if (existingUser) {
    const error = new Error("El email ya está registrado")
    error.status = 409
    throw error
  }

  const user = await prisma.user.create({
    data: {
      email: normalizedEmail,
      username: normalizedUsername,
      password: await bcrypt.hash(String(password), 12),
      role: "USER",
    },
  })

  const safeUser = publicUser(user)
  return { user: safeUser, token: createToken(safeUser) }
}

export async function loginUser({ email, password }) {
  const normalizedEmail = String(email || "").trim().toLowerCase()
  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } })

  if (!user || !(await bcrypt.compare(String(password || ""), user.password))) {
    const error = new Error("Email o contraseña incorrectos")
    error.status = 401
    throw error
  }

  const safeUser = publicUser(user)
  return { user: safeUser, token: createToken(safeUser) }
}

export async function getCurrentUser(userId) {
  const user = await prisma.user.findUnique({ where: { id: Number(userId) } })
  if (!user) {
    const error = new Error("Usuario no encontrado")
    error.status = 404
    throw error
  }
  return publicUser(user)
}