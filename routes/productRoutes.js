import { Router } from "express"
import { createProductHandler, deleteProductHandler, getProductById, getProducts, updateProductHandler } from "../controllers/productController.js"
import { adminMiddleware } from "../middleware/adminMiddleware.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = Router()
router.get("/", getProducts)
router.get("/:id", getProductById)
router.post("/", authMiddleware, adminMiddleware, createProductHandler)
router.put("/:id", authMiddleware, adminMiddleware, updateProductHandler)
router.delete("/:id", authMiddleware, adminMiddleware, deleteProductHandler)

export default router
