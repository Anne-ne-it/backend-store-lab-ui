import { supabase } from "../data/supabaseClient.js";

export async function getMe(req, res) {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, username, role, created_at")
      .eq("id", req.user.id)
      .maybeSingle();

    if (error) throw error;

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.json({
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener el usuario",
    });
  }
}
