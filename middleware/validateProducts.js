export const validateMovie = (req, res, next) => {
  const { title } = req.body
  if (!title) {
    return res.status(400).json({
      ok: false,
      error: "El campo title es obligatorio",
    })
  }

  next()
}