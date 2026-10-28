package com.example.el_noticioso_backend.dto.out;

/**
 * Respuesta de error. El mensaje de los procedimientos (RAISE EXCEPTION) llega tal cual
 * para mostrarlo en el frontend (por ejemplo, "El correo ... ya se encuentra registrado.").
 */
public record ErrorResponse(
        String mensaje
) {
}
