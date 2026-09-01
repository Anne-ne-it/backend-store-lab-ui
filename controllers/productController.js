import { files } from "../config/config.js";
import { readJson } from "../utils/jsonDb.js";

export async function getProducts(req, res) {
  try {
    const products = await readJson(files.products);

    const { category } = req.query;

    const result = category
      ? products.filter(
          (product) =>
            product.category.toLowerCase() ===
            category.toLowerCase()
        )
      : products;

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener productos",
    });
  }
}

export async function getProductById(req, res) {
  try {
    const products = await readJson(files.products);

    const product = products.find(
      (item) => item.id === Number(req.params.id)
    );

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener el producto",
    });
  }
}