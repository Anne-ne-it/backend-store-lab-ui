import { files } from "../config/config.js";
import { readJson } from "../utils/jsonDb.js";

export async function getMe(req, res) {
  try {
    const users = await readJson(files.users);

    const user = users.find(
      (item) => item.id === req.user.id
    );

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.json({
      data: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener el usuario",
    });
  }
}