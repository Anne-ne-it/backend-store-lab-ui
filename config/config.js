import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PORT = process.env.PORT || 3000;

export const JWT_SECRET =
  process.env.JWT_SECRET || "dev-secret-change-me";

export const files = {
  products: path.join(__dirname, "../data/products.json"),
  users: path.join(__dirname, "../data/users.json"),
  reviews: path.join(__dirname, "../data/reviews.json"),
};