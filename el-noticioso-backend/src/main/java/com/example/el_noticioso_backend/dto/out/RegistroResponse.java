package com.example.el_noticioso_backend.dto.out;

public record RegistroResponse(
        String nombre,
        String apellidos,
        String telefono,
        String correo,
        String usuario
) {
}
