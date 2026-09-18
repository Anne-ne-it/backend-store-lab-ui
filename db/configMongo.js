import "dotenv/config"
import mongoose from "mongoose"


export const dbConnection = async () => {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    throw new Error("MONGODB_URI no está configurada")
  }
  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
  })

  console.log("Base de datos MongoDB conectada correctamente")
}
