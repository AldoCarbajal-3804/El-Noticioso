package com.example.el_noticioso_backend.entities.views;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.time.OffsetDateTime;

@Entity
@Table(name = "v_noticias")
@Immutable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class NoticiaView {

    @Id
    private Long id;

    private String titulo;
    private String autor;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(columnDefinition = "TEXT")
    private String resumen;

    private String imagen;

    @Column(name = "fecha")
    private OffsetDateTime fecha;

    private String categoria; // Viene en texto gracias a la vista
    private String ubicacion; // Viene en texto gracias a la vista

}
