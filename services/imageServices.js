import crypto from "node:crypto"

export async function uploadImage(image) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  if (!cloudName || !apiKey || !apiSecret) {
    const error = new Error("Cloudinary no está configurado en el backend")
    error.status = 503
    throw error
  }
  if (typeof image !== "string" || !image.startsWith("data:image/")) {
    const error = new Error("La imagen no tiene un formato válido")
    error.status = 400
    throw error
  }

  const timestamp = Math.floor(Date.now() / 1000)
  const signatureBase = `timestamp=${timestamp}${apiSecret}`
  const signature = crypto.createHash("sha1").update(signatureBase).digest("hex")
  const body = new URLSearchParams({ file: image, api_key: apiKey, timestamp: String(timestamp), signature })
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body })
  const data = await response.json()
  if (!response.ok) {
    const error = new Error(data.error?.message || "No se pudo subir la imagen a Cloudinary")
    error.status = 502
    throw error
  }
  return data.secure_url
}