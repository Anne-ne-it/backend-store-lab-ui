import "dotenv/config"
import app from "./app.js"
import { PORT } from "./config/config.js"
import { dbConnection } from "./db/configMongo.js"

const startServer = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await dbConnection()
    } else {
      console.warn("MongoDB no configurado; se omite la conexión porque la app usa Prisma para usuarios/productos.")
    }

    app.listen(PORT, () => {
      console.log(`StoreLab API escuchando en http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error)
  }
}

startServer()