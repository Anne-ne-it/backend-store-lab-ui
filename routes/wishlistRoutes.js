import { Router } from "express"
import { getWishlist, toggleWishlist, removeFromWishlist, } from "../controllers/wishlistController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = Router()

// Todas las rutas de la wishlist requieren estar autenticado
router.use(authMiddleware)

// GET /api/wishlist -> Obtiene los favoritos del usuario autenticado
router.get("/", getWishlist)

// POST /api/wishlist/toggle -> Añade o quita un producto de la wishlist
router.post("/toggle", toggleWishlist)

// DELETE /api/wishlist/:id -> Elimina un elemento directamente por su ID
router.delete("/:id", removeFromWishlist)

export default router