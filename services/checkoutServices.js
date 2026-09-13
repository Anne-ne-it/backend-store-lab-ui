import prisma from "../lib/prisma.js"

export async function createCheckoutSession(items, successUrl, cancelUrl) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    const error = new Error("Stripe no está configurado en el backend")
    error.status = 503
    throw error
  }
  if (!Array.isArray(items) || items.length === 0) {
    const error = new Error("El carrito está vacío")
    error.status = 400
    throw error
  }

  const ids = items.map((item) => Number(item.productId)).filter(Number.isInteger)
  const products = await prisma.product.findMany({ where: { id: { in: ids } } })
  const byId = new Map(products.map((product) => [product.id, product]))

  const lineItems = []
  for (const item of items) {
    const product = byId.get(Number(item.productId))
    const quantity = Number(item.quantity)
    if (!product || !Number.isInteger(quantity) || quantity < 1) {
      const error = new Error("Hay un producto o cantidad no válida en el carrito")
      error.status = 400
      throw error
    }
    if (quantity > product.stock) {
      const error = new Error(`No hay stock suficiente para ${product.name}`)
      error.status = 400
      throw error
    }
    lineItems.push({ product, quantity })
  }

  const params = new URLSearchParams()
  params.set("mode", "payment")
  params.set("success_url", successUrl)
  params.set("cancel_url", cancelUrl)
  params.set("billing_address_collection", "auto")
  lineItems.forEach(({ product, quantity }, index) => {
    params.set(`line_items[${index}][price_data][currency]`, "eur")
    params.set(`line_items[${index}][price_data][product_data][name]`, product.name)
    params.set(`line_items[${index}][price_data][product_data][description]`, product.description.slice(0, 500))
    params.set(`line_items[${index}][price_data][unit_amount]`, String(Math.round(product.price * 100)))
    params.set(`line_items[${index}][quantity]`, String(quantity))
  })

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${secretKey}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  })
  const data = await response.json()
  if (!response.ok) {
    const error = new Error(data.error?.message || "No se pudo crear la sesión de Stripe")
    error.status = 502
    throw error
  }
  return { url: data.url, id: data.id }
}