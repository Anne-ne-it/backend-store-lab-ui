export function notFound(req, res) {
  res.status(404).json({ message: "Ruta no encontrada" })
}

export function errorHandler(error, req, res, next) {
  console.error(`[${req.method} ${req.originalUrl}]`, error)
  if (res.headersSent) return next(error)

  if (error.status) return res.status(error.status).json({ message: error.message })
  if (error.code === "P2002") return res.status(409).json({ message: "Ya existe un registro con ese valor" })
  if (error.code === "P2025") return res.status(404).json({ message: "Registro no encontrado" })

  res.status(500).json({ message: "Error interno del servidor" })
}
