import prisma from "../lib/prisma.js"

export async function listProducts(category) {
  const products = await prisma.product.findMany({
    where: category ? { category: { equals: String(category), mode: "insensitive" } } : undefined,
    orderBy: { id: "asc" },
    include: { reviews: { select: { rating: true } }, _count: { select: { reviews: true } } },
  })
  return products.map(withRating)
}

export async function findProductById(id) {
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      reviews: { orderBy: { createdAt: "desc" }, include: { user: { select: { username: true, email: true } } } },
      _count: { select: { reviews: true } },
    },
  })
  return product ? withRating(product) : null
}

export async function createProduct(data) {
  return prisma.product.create({ data: normalizeProduct(data) })
}

export async function updateProduct(id, data) {
  return prisma.product.update({ where: { id: Number(id) }, data: normalizeProduct(data) })
}

export async function removeProduct(id) {
  return prisma.product.delete({ where: { id: Number(id) } })
}

function normalizeProduct(data = {}) {
  return {
    name: String(data.name || "").trim(),
    category: String(data.category || "").trim(),
    description: String(data.description || "").trim(),
    image: String(data.image || "").trim(),
    price: Number(data.price),
    stock: Number.isInteger(Number(data.stock)) ? Number(data.stock) : 0,
  }
}

function withRating(product) {
  const ratings = product.reviews?.map((review) => review.rating) || []
  const rating = ratings.length ? ratings.reduce((sum, value) => sum + value, 0) / ratings.length : 0
  return { ...product, rating: Number(rating.toFixed(2)), reviewCount: product._count?.reviews || ratings.length }
}
