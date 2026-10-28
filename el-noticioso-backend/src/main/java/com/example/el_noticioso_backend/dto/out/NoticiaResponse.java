package com.example.el_noticioso_backend.dto.out;

import com.example.el_noticioso_backend.entities.enums.CategoriaEnum;
import com.example.el_noticioso_backend.entities.enums.UbicacionEnum;

import java.time.OffsetDateTime;

/**
 * Salida de la vista v_noticias (columnas: id, titulo, descripcion, resumen, imagen, autor, fecha, categoria, ubicacion).
 */
public record NoticiaResponse(
        Long id,
        String titulo,
        String autor,
        String descripcion,
        String resumen,
        String imagen,
        OffsetDateTime fecha,
        CategoriaEnum categoria,
        UbicacionEnum ubicacion
) {
}
