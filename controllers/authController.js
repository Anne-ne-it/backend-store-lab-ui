import bcrypt from "bcryptjs";

import { files } from "../config/config.js";
import { readJson, writeJson, } from "../utils/jsonDb.js";

import { createToken } from "../utils/token.js";

export async function register(req, res) {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        message:
          "Email y contraseña son obligatorios",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message:
          "La contraseña debe tener al menos 6 caracteres",
      });
    }

    const users = await readJson(files.users);

    const normalizedEmail =
      email.trim().toLowerCase();

    const userExists = users.some(
      (user) => user.email === normalizedEmail
    );

    if (userExists) {
      return res.status(409).json({
        message: "El email ya está registrado",
      });
    }

    const user = {
      id: users.length ? Math.max( ...users.map((item) => item.id) ) + 1 : 1,
      email: normalizedEmail,
      password: await bcrypt.hash(password, 10),
      createdAt: new Date().toISOString(),
    };

    users.push(user);

    await writeJson(files.users, users);

    const token = createToken(user);

    res.status(201).json({
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al registrar usuario",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const users = await readJson(files.users);

    const normalizedEmail =
      email?.trim().toLowerCase();

    const user = users.find(
      (item) =>
        item.email === normalizedEmail
    );

    if (
      !user ||
      !(await bcrypt.compare(
        password || "",
        user.password
      ))
    ) {
      return res.status(401).json({
        message:
          "Email o contraseña incorrectos",
      });
    }

    const token = createToken(user);

    res.json({
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al iniciar sesión",
    });
  }
}