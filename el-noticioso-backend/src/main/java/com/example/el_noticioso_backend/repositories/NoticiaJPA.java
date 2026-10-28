package com.example.el_noticioso_backend.repositories;


import com.example.el_noticioso_backend.entities.Noticia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticiaJPA extends JpaRepository<Noticia,Long> {

    @Procedure(procedureName = "registrar_noticia")
    void registrarNoticia(
            @Param("p_titulo") String titulo,
            @Param("p_autor") String autor,
            @Param("p_descripcion") String descripcion,
            @Param("p_imagen") String imagen,
            @Param("p_resumen") String resumen,
            @Param("p_nombre_categoria") String nombreCategoria,
            @Param("p_nombre_ubicacion") String nombreUbicacion
    );

    @Procedure(procedureName = "actualizar_noticia")
    void actualizarNoticia(
            @Param("p_id") Long id,
            @Param("p_titulo") String titulo,
            @Param("p_autor") String autor,
            @Param("p_descripcion") String descripcion,
            @Param("p_imagen") String imagen,
            @Param("p_resumen") String resumen,
            @Param("p_nombre_categoria") String nombreCategoria,
            @Param("p_nombre_ubicacion") String nombreUbicacion
    );

    @Procedure(procedureName = "eliminar_noticia")
    void eliminarNoticia(@Param("p_id") Long id);

}
