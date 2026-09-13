import "dotenv/config"
import express from "express"
import cors from "cors"

import productRoutes from "./routes/productRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import wishlistRoutes from "./routes/wishlistRoutes.js"
import checkoutRoutes from "./routes/checkoutRoutes.js"
import { errorHandler, notFound } from "./middleware/errorHandler.js"

const app = express()

const configuredOrigins = (process.env.CORS_ORIGINS || "").split(",").map((origin) => origin.trim()).filter(Boolean)
const allowedOrigins = [
  ...configuredOrigins,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
]

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true)
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      console.warn(`Origen bloqueado por CORS: ${origin}`)
      return callback(null, false)
    },
    credentials: true,
  })
)

app.use(express.json({ limit: "8mb" }))

app.get("/", (req, res) => {
  res.json({
    message: "StoreLab API funcionando",
  })
})

app.get("/health", (req, res) => {
  res.json({
    ok: true,
  })
})

app.use("/api/products", productRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/checkout", checkoutRoutes)
app.use("/api/users", userRoutes)

app.use(notFound)
app.use(errorHandler)

export default app