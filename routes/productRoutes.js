import { Router } from "express"
import {
  createProductHandler,
  deleteProductHandler,
  getProductById,
  getProducts,
  updateProductHandler,
  uploadProductImageHandler,
} from "../controllers/productController.js"
import { adminMiddleware } from "../middleware/adminMiddleware.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { validateProduct, validateProductUpdate } from "../middleware/validateProducts.js"
import { upload } from "../config/multer.js"

const router = Router()

router.get("/", getProducts)
router.get("/:id", getProductById)

router.post(
  "/upload-image",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  uploadProductImageHandler
)

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  validateProduct,
  createProductHandler
)

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  validateProductUpdate,
  updateProductHandler
)

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProductHandler
)

export default router