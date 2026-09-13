import { body, validationResult } from "express-validator"

export const validateProduct = [
  // 1. Validar name (reemplaza a title): no puede estar vacío
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio"),

  // 2. Validar category: no puede estar vacía
  body("category")
    .trim()
    .notEmpty()
    .withMessage("La categoría es obligatoria"),

  // 3. Validar description: no puede estar vacía
  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripción es obligatoria"),

  // 4. Validar price: debe ser un número y no puede ser negativo
  body("price")
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número válido mayor o igual a 0"),

  // 5. Validar stock: debe ser un número entero y no puede ser negativo
  body("stock")
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero mayor o igual a 0"),

  // Middleware encargado de revisar si hubo errores en las validaciones anteriores
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