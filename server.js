import "dotenv/config"
import app from "./app.js"
import { PORT } from "./config/config.js"
import { dbConnection } from "./db/configMongo.js"

console.log("PORT recibido por Render:", process.env.PORT )
console.log("JWT_SECRET configurado:", Boolean(process.env.JWT_SECRET))
console.log("DATABASE_URL configurada:", Boolean(process.env.DATABASE_URL))
console.log("MONGODB_URI configurada:", Boolean(process.env.MONGODB_URI))

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`StoreLab API escuchando en el puerto ${PORT}`)
})

dbConnection()
  .then(() => {
    console.log("MongoDB preparado para reviews y wishlist")
  })
  .catch((error) => {
    console.error("No se pudo conectar a MongoDB:", error.message)
    console.error("Reviews y wishlist no estarán disponibles.")
  })

function shutdown() {
  console.log("Cerrando servidor...")

  server.close(() => {
    process.exit(0)
  })
}

process.on("SIGTERM", shutdown)
process.on("SIGINT", shutdown)
