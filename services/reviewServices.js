import Review from "../models/reviews.js"

export const createReview = async (data) => {
  const review = new Review(data)
  return await review.save()
}

export const getReviewsByProduct = async (productId) => {
  return await Review.find({ productId })
}

export const updateReview = async (id, data) => {
  return await Review.findByIdAndUpdate(id, data, { new: true })
}

export const deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id)
}