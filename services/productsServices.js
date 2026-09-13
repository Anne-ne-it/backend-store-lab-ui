import prisma from "../lib/prisma.js"

export async function listProducts(category, limit) {
  const parsedLimit = Number(limit)
  const normalizedLimit = Number.isInteger(parsedLimit) && parsedLimit > 0 ? parsedLimit : undefined

  const products = await prisma.product.findMany({
    where: category ? { category: { equals: String(category), mode: "insensitive" } } : undefined,
    orderBy: normalizedLimit ? { createdAt: "desc" } : { id: "asc" },
    take: normalizedLimit,
  })

  return products.map(withRating)
}

export async function findProductById(id) {
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  })
  return product ? withRating(product) : null
}

export async function createProduct(data) {
  return prisma.product.create({ data: normalizeProduct(data) })
}

export async function updateProduct(id, data) {
  return prisma.product.update({
    where: { id: Number(id) },
    data: normalizeProduct(data, true),
  })
}

export async function removeProduct(id) {
  return prisma.product.delete({ where: { id: Number(id) } })
}

function normalizeProduct(data = {}, isUpdate = false) {
  const normalized = {}

  if (!isUpdate || data.name !== undefined) {
    normalized.name = String(data.name || "").trim()
  }

  if (!isUpdate || data.category !== undefined) {
    normalized.category = String(data.category || "").trim()
  }

  if (!isUpdate || data.description !== undefined) {
    normalized.description = String(data.description || "").trim()
  }

  if (!isUpdate || data.image !== undefined) {
    normalized.image = String(data.image || "").trim()
  }

  if (!isUpdate || data.price !== undefined) {
    normalized.price = Number(data.price)
  }

  if (!isUpdate || data.stock !== undefined) {
    normalized.stock = Number.isInteger(Number(data.stock)) ? Number(data.stock) : 0
  }

  return normalized
}

function withRating(product) {
  const ratings = Array.isArray(product.reviews) ? product.reviews.map((review) => review.rating) : []
  const rating = ratings.length ? ratings.reduce((sum, value) => sum + value, 0) / ratings.length : 0

  return {
    ...product,
    rating: Number(rating.toFixed(2)),
    reviewCount: product._count?.reviews || ratings.length,
  }
}