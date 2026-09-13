import {
  createProduct,
  findProductById,
  listProducts,
  removeProduct,
  updateProduct,
} from "../services/productsServices.js"

import { uploadImage } from "../services/imageServices.js"
import cloudinary from "../config/cloudinary.js"

export async function getProducts(req, res, next) {
  try {
    res.json(await listProducts(req.query.category, req.query.limit))
  } catch (error) {
    next(error)
  }
}

export async function getProductById(req, res, next) {
  try {
    const product = await findProductById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }

    res.json(product)
  } catch (error) {
    next(error)
  }
}

export async function createProductHandler(req, res, next) {
  try {
    const file = req.file

    if (!file) {
      const error = new Error("Image is required")
      error.status = 400
      throw error
    }

    const imageUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error)
          else resolve(result?.secure_url)
        }
      )

      stream.end(file.buffer)
    })

    const payload = {
      ...req.body,
      image: imageUrl,
      price: Number(req.body.price),
      stock: Number(req.body.stock || 0),
    }

    res.status(201).json(await createProduct(payload))
  } catch (error) {
    next(error)
  }
}

export async function updateProductHandler(req, res, next) {
  try {
    const payload = { ...req.body }

    if (req.file) {
      const imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) reject(error)
            else resolve(result?.secure_url)
          }
        )

        stream.end(req.file.buffer)
      })

      payload.image = imageUrl
    }

    if (payload.price !== undefined) payload.price = Number(payload.price)
    if (payload.stock !== undefined) payload.stock = Number(payload.stock || 0)

    res.json(await updateProduct(req.params.id, payload))
  } catch (error) {
    next(error)
  }
}

export async function deleteProductHandler(req, res, next) {
  try {
    res.json(await removeProduct(req.params.id))
  } catch (error) {
    next(error)
  }
}

export async function uploadProductImageHandler(req, res, next) {
  try {
    if (!req.file) {
      const error = new Error("Image is required")
      error.status = 400
      throw error
    }

    const imageUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error)
          else resolve(result?.secure_url)
        }
      )

      stream.end(req.file.buffer)
    })

    res.json({ data: imageUrl })
  } catch (error) {
    next(error)
  }
}