import { Router } from "express"
import { me } from "../controllers/authController.js"
import {
  deleteUser,
  getMe,
  getUserById,
  listUsers,
  updateUserRole,
} from "../controllers/userController.js"
import { adminMiddleware } from "../middleware/adminMiddleware.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = Router()

router.get("/me", authMiddleware, me)
router.get("/admin/me", authMiddleware, getMe)

router.get("/", authMiddleware, adminMiddleware, listUsers)
router.get("/:id", authMiddleware, adminMiddleware, getUserById)
router.patch("/:id/role", authMiddleware, adminMiddleware, updateUserRole)
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser)

export default router
