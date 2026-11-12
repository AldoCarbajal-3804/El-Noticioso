package com.example.el_noticioso_scrapping;

import java.util.Date;

public record ExtrasDTO(
        String urlNoticia,
        String titulo,
        Date fecha,
        String urlImagen,
        String autor
) {
}
