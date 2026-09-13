import * as wishlistService from "../services/wishlistServices.js"

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id

    const wishlistItems = await wishlistService.getWishlistByUser(userId)
    
    res.json({
      ok: true,
      data: wishlistItems,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    })
  }
}

export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body
    const userId = req.user.id // Extraído de forma segura

    if (!productId) {
      return res.status(400).json({
        ok: false,
        error: "El id del producto es obligatorio",
      })
    }

    const wishlistItem = await wishlistService.toggleWishlist 
      ? await wishlistService.toggleWishlist(userId, productId)
      : await wishlistService.addToWishlist(userId, productId)

    res.status(200).json({
      ok: true,
      data: wishlistItem,
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      error: error.message,
    })
  }
}

export const removeFromWishlist = async (req, res) => {
  try {
    const wishlistItem = await wishlistService.removeFromWishlist(req.params.id)

    if (!wishlistItem) {
      return res.status(404).json({
        ok: false,
        error: "Elemento no encontrado",
      })
    }

    res.json({
      ok: true,
      message: "Elemento eliminado de la wishlist",
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    })
  }
}