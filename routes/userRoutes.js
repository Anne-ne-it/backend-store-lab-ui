import { Router } from "express"
import { me } from "../controllers/authController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = Router()
router.get("/me", authMiddleware, me)
export default router
