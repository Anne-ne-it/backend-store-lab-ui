import { Wishlist } from "../models/wishlist.js"

export const addToWishlist = async (userId, productId) => {
  const wishlist = new Wishlist({ userId, productId })
  return await wishlist.save()
}

export const getWishlistByUser = async (userId) => {
  return await Wishlist.find({ userId })
}

export const removeFromWishlist = async (id) => {
  return await Wishlist.findByIdAndDelete(id)
}