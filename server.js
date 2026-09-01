import "dotenv/config";

import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
cors({
origin: "http://localhost:5174",
credentials: true,
})
);

app.use(express.json());

app.get("/", (req, res) => {
res.json({
message: "StoreLab API funcionando",
});
});

app.listen(PORT, () => {
console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
