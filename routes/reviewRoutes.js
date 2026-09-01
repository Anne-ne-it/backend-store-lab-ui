import { Router } from "express";

import { getReviewsByProduct, createReview, } from "../controllers/reviewController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get( "/product/:productId", getReviewsByProduct );

router.post( "/", authMiddleware, createReview );

export default router;