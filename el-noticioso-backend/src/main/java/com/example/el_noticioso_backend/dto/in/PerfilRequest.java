package com.example.el_noticioso_backend.dto.in;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Entrada para actualizar_perfil_usuario(p_correo, p_nuevo_nombre, p_new_apellidos, p_nuevo_telefono, p_nuevo_usuario).
 * El correo NO va en el cuerpo: el backend lo toma del JWT validado, y el procedimiento
 * solo permite modificar el perfil del propio usuario. El correo tampoco es modificable.
 */
public record PerfilRequest(

        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 100, message = "El nombre no puede superar 100 caracteres")
        @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]+$", message = "El nombre no es válido")
        String nombre,

        @NotBlank(message = "Los apellidos son obligatorios")
        @Size(max = 150, message = "Los apellidos no pueden superar 150 caracteres")
        @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]+$", message = "Los apellidos no son válidos")
        String apellidos,

        @Pattern(regexp = "^9\\d{8}$", message = "El teléfono debe tener 9 dígitos y empezar en 9")
        String telefono,

        @NotBlank(message = "El usuario es obligatorio")
        @Size(min = 6, max = 30, message = "El usuario debe tener entre 6 y 30 caracteres")
        String usuario

) {
}
