import prisma from "../lib/prisma.js"

const userSelect = {
  id: true,
  email: true,
  username: true,
  role: true,
  createdAt: true,
}

export async function getMe(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.user.id) },
      select: userSelect,
    })

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      })
    }

    res.json({ data: user })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Error al obtener el usuario",
    })
  }
}

export async function listUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: userSelect,
    })

    res.json({ data: users })
  } catch (error) {
    next(error)
  }
}

export async function getUserById(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      select: userSelect,
    })

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }

    res.json({ data: user })
  } catch (error) {
    next(error)
  }
}

export async function updateUserRole(req, res, next) {
  try {
    const userId = Number(req.params.id)
    const nextRole = String(req.body?.role || "").trim().toUpperCase()
    const allowedRoles = ["USER", "ADMIN"]

    if (!allowedRoles.includes(nextRole)) {
      return res.status(400).json({
        message: "El rol no es válido. Usa USER o ADMIN.",
      })
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: nextRole },
      select: userSelect,
    })

    res.json({ data: user, message: "Rol actualizado correctamente" })
  } catch (error) {
    if (error?.code === "P2025") {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }
    next(error)
  }
}

export async function deleteUser(req, res, next) {
  try {
    const userId = Number(req.params.id)

    if (userId === Number(req.user.id)) {
      return res.status(400).json({
        message: "No puedes eliminar tu propia cuenta desde el panel de administración",
      })
    }

    await prisma.user.delete({ where: { id: userId } })

    res.json({ message: "Usuario eliminado correctamente" })
  } catch (error) {
    if (error?.code === "P2025") {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }
    next(error)
  }
}