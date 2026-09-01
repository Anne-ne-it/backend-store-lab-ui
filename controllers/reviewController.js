import { files } from "../config/config.js";
import { readJson, writeJson, } from "../utils/jsonDb.js";

export async function getReviewsByProduct(req, res) {
  try {
    const reviews = await readJson(files.reviews);

    const result = reviews.filter(
      (review) =>
        review.productId === Number(req.params.productId)
    );

    res.json({
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener reseñas",
    });
  }
}

export async function createReview(req, res) {
  try {
    const {
      productId,
      rating,
      comment,
    } = req.body;

    if (!productId || !rating || !comment?.trim()) {
      return res.status(400).json({
        message: "productId, rating y comment son obligatorios",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "La valoración debe estar entre 1 y 5",
      });
    }

    const products = await readJson(files.products);

    const productExists = products.some(
      (product) => product.id === Number(productId)
    );

    if (!productExists) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    const reviews = await readJson(files.reviews);

    const review = {
      id: reviews.length ? Math.max(...reviews.map((item) => item.id)) + 1 : 1,
      productId: Number(productId),
      userId: req.user.id,
      userEmail: req.user.email,
      rating: Number(rating),
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };

    reviews.push(review);

    await writeJson(files.reviews, reviews);

    res.status(201).json({
      data: review,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al crear la reseña",
    });
  }
}