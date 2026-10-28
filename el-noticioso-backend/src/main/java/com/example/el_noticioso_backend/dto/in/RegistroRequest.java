package com.example.el_noticioso_backend.dto.in;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Entrada para registrar_usuario(p_nombre, p_apellidos, p_telefono, p_usuario, p_correo, p_contrasena).
 * El rol no se envía: el procedimiento asigna USUARIO por defecto.
 */
public record RegistroRequest(

        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 100, message = "El nombre no puede superar 100 caracteres")
        @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]+$", message = "El nombre no es válido")
        String nombre,

        @NotBlank(message = "Los apellidos son obligatorios")
        @Size(max = 150, message = "Los apellidos no pueden superar 150 caracteres")
        @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]+$", message = "Los apellidos no son válidos")
        String apellidos,

        // Opcional. Si se envía, debe ser un celular peruano de 9 dígitos.
        @Pattern(regexp = "^9\\d{8}$", message = "El teléfono debe tener 9 dígitos y empezar en 9")
        String telefono,

        @NotBlank(message = "El correo es obligatorio")
        @Email(message = "El correo no es válido")
        @Size(max = 254, message = "El correo no puede superar 254 caracteres")
        String correo,

        @NotBlank(message = "El usuario es obligatorio")
        @Size(min = 6, max = 30, message = "El usuario debe tener entre 6 y 30 caracteres")
        String usuario,

        // Máximo 72: bcrypt ignora los bytes posteriores.
        @NotBlank(message = "La contraseña es obligatoria")
        @Size(min = 6, max = 72, message = "La contraseña debe tener entre 6 y 72 caracteres")
        String contrasena

) {
}
