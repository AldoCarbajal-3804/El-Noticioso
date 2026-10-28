package com.example.el_noticioso_backend.dto.in;

import com.example.el_noticioso_backend.entities.enums.CategoriaEnum;
import com.example.el_noticioso_backend.entities.enums.UbicacionEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Entrada para registrar_noticia y actualizar_noticia.
 * Parámetros: p_titulo, p_autor, p_descripcion, p_imagen, p_resumen, p_nombre_categoria, p_nombre_ubicacion.
 * En actualizar_noticia el id va en la ruta (p_id), no en el cuerpo.
 * Categoría y ubicación son enums: Jackson rechaza valores fuera de la lista antes de llegar a la base.
 * Usar categoria.name() y ubicacion.name() al llamar al procedimiento.
 */
public record NoticiaRequest(

        @NotBlank(message = "El título es obligatorio")
        @Size(max = 300, message = "El título no puede superar 300 caracteres")
        String titulo,

        @NotBlank(message = "El autor es obligatorio")
        @Size(max = 150, message = "El autor no puede superar 150 caracteres")
        String autor,

        @NotBlank(message = "La descripción es obligatoria")
        @Size(max = 500, message = "La descripción no puede superar 500 caracteres")
        String descripcion,

        // Opcional. Puede ser null.
        @Size(max = 500, message = "La ruta de la imagen no puede superar 500 caracteres")
        String imagen,

        @NotBlank(message = "El resumen es obligatorio")
        @Size(max = 5000, message = "El resumen no puede superar 5000 caracteres")
        String resumen,

        @NotNull(message = "La categoría es obligatoria")
        CategoriaEnum categoria,

        @NotNull(message = "La ubicación es obligatoria")
        UbicacionEnum ubicacion

) {
}
