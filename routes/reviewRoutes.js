import { Router } from "express"
import { createReview, getReviewsByProduct } from "../controllers/reviewController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = Router()
router.get("/product/:productId", getReviewsByProduct)
router.post("/", authMiddleware, createReviewHandler)
export default router
