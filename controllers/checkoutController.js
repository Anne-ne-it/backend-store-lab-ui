import { createCheckoutSession } from "../services/checkoutServices.js"

export async function checkoutSession(req, res, next) {
  try {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173"
    const data = await createCheckoutSession(req.body.items, `${frontendUrl}/checkout?success=true`, `${frontendUrl}/checkout?cancelled=true`)
    res.json({ data })
  } catch (error) { next(error) }
}