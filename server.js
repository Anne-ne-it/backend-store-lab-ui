import "dotenv/config"
import app from "./app.js"
import { PORT } from "./config/config.js"

app.listen(PORT, () => {
  console.log(`StoreLab API escuchando en http://localhost:${PORT}`)
})
