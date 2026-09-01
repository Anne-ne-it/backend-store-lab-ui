import express from "express";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

//Configuración de CORS restringida a Vite (puerto 5173 por defecto)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "StoreLab API funcionando",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/review", reviewRoutes);
app.use("/auth", authRoutes);
app.use("/", userRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Ruta no encontrada",
  });
});

export default app;