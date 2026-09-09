import { createProduct, findProductById, listProducts, removeProduct, updateProduct } from "../services/productsServices.js"

export async function getProducts(req, res, next) {
  try { res.json(await listProducts(req.query.category)) } catch (error) { next(error) }
}

export async function getProductById(req, res, next) {
  try {
    const product = await findProductById(req.params.id)
    if (!product) return res.status(404).json({ message: "Producto no encontrado" })
    res.json(product)
  } catch (error) { next(error) }
}

export async function createProductHandler(req, res, next) {
  try { res.status(201).json(await createProduct(req.body)) } catch (error) { next(error) }
}

export async function updateProductHandler(req, res, next) {
  try { res.json(await updateProduct(req.params.id, req.body)) } catch (error) { next(error) }
}

export async function deleteProductHandler(req, res, next) {
  try { res.json(await removeProduct(req.params.id)) } catch (error) { next(error) }
}
