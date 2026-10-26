package com.example.el_noticioso_backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Entity
@Table(name = "noticia")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Noticia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    private String titulo;

    private String autor;

    private String descripcion;

    private String imagen;

    private String resumen;

    private OffsetDateTime publicacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categoria", nullable = false)
    private Categoria categoria;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_ubicacion", nullable = false)
    private Ubicacion ubicacion;

}
