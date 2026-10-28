package com.example.el_noticioso_backend.dto.in;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

/**
 * Entrada para agregar_favorito y eliminar_favorito (p_correo, p_id_noticia).
 * El correo se toma del JWT validado, no del cuerpo de la petición.
 */
public record FavoritoRequest(

        @NotNull(message = "El id de la noticia es obligatorio")
        @Positive(message = "El id de la noticia debe ser positivo")
        Long idNoticia

) {
}
