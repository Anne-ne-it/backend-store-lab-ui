export function adminMiddleware(req, res, next) {
  if (String(req.user?.role || "").toUpperCase() !== "ADMIN") {
    return res.status(403).json({ message: "Se requieren permisos de administrador" })
  }
  next()
}
