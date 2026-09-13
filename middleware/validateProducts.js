import { body, validationResult } from "express-validator"

const validateProductFields = (required = true) => [
  body("name")
    .optional({ values: "falsy" })
    .trim()
    .if(() => required)
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio"),

  body("category")
    .optional({ values: "falsy" })
    .trim()
    .if(() => required)
    .notEmpty()
    .withMessage("La categoría es obligatoria"),

  body("description")
    .optional({ values: "falsy" })
    .trim()
    .if(() => required)
    .notEmpty()
    .withMessage("La descripción es obligatoria"),

  body("price")
    .optional({ values: "falsy" })
    .if(() => required)
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número válido mayor o igual a 0"),

  body("stock")
    .optional({ values: "falsy" })
    .if(() => required)
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero mayor o igual a 0"),

  body("image")
    .optional({ values: "falsy" })
    .custom((value) => {
      if (!value) return true
      if (typeof value === "string" && value.startsWith("http")) return true
      return false
    })
    .withMessage("La imagen debe ser una URL válida"),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        errors: errors.array().map((err) => err.msg),
      })
    }

    next()
  },
]

export const validateProduct = validateProductFields(true)
export const validateProductUpdate = validateProductFields(false)