package com.example.el_noticioso_backend.dto.in;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Entrada para actualizar_contrasena_user(p_correo, p_nueva_contrasena).
 * El correo se toma del JWT validado, no del cuerpo de la petición.
 */
public record CambioContrasenaRequest(

        @NotBlank(message = "La nueva contraseña es obligatoria")
        @Size(min = 6, max = 72, message = "La contraseña debe tener entre 6 y 72 caracteres")
        String nuevaContrasena

) {
}
