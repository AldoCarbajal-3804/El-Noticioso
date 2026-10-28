package com.example.el_noticioso_backend.dto.out;

import com.example.el_noticioso_backend.entities.enums.CategoriaEnum;
import com.example.el_noticioso_backend.entities.enums.UbicacionEnum;

import java.time.OffsetDateTime;

/**
 * Salida de listar_favoritos_por_nombre_usuario:
 * (id_favorito, id_noticia, titulo, descripcion, resumen, imagen, autor, fecha, categoria, ubicacion).
 */
public record FavoritoResponse(
        Long idFavorito,
        Long idNoticia,
        String titulo,
        String descripcion,
        String resumen,
        String imagen,
        String autor,
        OffsetDateTime fecha,
        CategoriaEnum categoria,
        UbicacionEnum ubicacion
) {
}
