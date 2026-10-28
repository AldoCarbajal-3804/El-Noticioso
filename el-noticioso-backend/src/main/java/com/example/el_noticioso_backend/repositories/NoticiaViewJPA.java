package com.example.el_noticioso_backend.repositories;

import com.example.el_noticioso_backend.entities.views.NoticiaView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticiaViewJPA extends JpaRepository<NoticiaView, Long> {

    // Listado completo: usar findAll(). Este método solo aplica filtros opcionales.
    @Query("SELECT n FROM NoticiaView n WHERE " +
            "(:categoria IS NULL OR UPPER(n.categoria) = UPPER(:categoria)) AND " +
            "(:ubicacion IS NULL OR UPPER(n.ubicacion) = UPPER(:ubicacion)) AND " +
            "(:busqueda IS NULL OR LOWER(n.titulo) LIKE LOWER(CONCAT('%', :busqueda, '%')))")
    List<NoticiaView> filtrarNoticias(
            @Param("categoria") String categoria,
            @Param("ubicacion") String ubicacion,
            @Param("busqueda") String busqueda
    );

}
