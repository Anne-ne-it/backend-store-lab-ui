export const PORT = Number(process.env.PORT || 3000)
export const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está configurado")
}
