import { getCurrentUser, loginUser, registerUser } from "../services/authServices.js"

export async function register(req, res, next) {
  try {
    res.status(201).json({ data: await registerUser(req.body) })
  } catch (error) { next(error) }
}

export async function login(req, res, next) {
  try {
    res.json({ data: await loginUser(req.body) })
  } catch (error) { next(error) }
}

export async function me(req, res, next) {
  try {
    res.json({ data: await getCurrentUser(req.user.id) })
  } catch (error) { next(error) }
}
