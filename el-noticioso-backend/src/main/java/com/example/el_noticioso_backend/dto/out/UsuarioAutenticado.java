package com.example.el_noticioso_backend.dto.out;

import java.util.UUID;

/**
 * Identidad validada desde el JWT de Supabase.
 * authId = claim "sub" (auth.users.id); correo = claim "email".
 */
public record UsuarioAutenticado(UUID authId, String correo) {
}
