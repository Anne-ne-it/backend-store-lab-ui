import { Router } from "express"
import { checkoutSession } from "../controllers/checkoutController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = Router()
router.post("/create-session", authMiddleware, checkoutSession)

export default router