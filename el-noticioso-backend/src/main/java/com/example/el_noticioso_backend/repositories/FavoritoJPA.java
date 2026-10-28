package com.example.el_noticioso_backend.repositories;

import com.example.el_noticioso_backend.entities.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoritoJPA extends JpaRepository<Favorito, Long> {

    @Procedure(procedureName = "agregar_favorito")
    void agregarFavorito(@Param("p_correo") String correo, @Param("p_id_noticia") Long idNoticia);

    @Procedure(procedureName = "eliminar_favorito")
    void eliminarFavorito(@Param("p_correo") String correo, @Param("p_id_noticia") Long idNoticia);

    // Columnas: id_favorito, id_noticia, titulo, descripcion, resumen, imagen, autor, fecha, categoria, ubicacion
    @Query(value = "SELECT * FROM listar_favoritos_por_nombre_usuario(:nombreUsuario)", nativeQuery = true)
    List<Object[]> listarFavoritosPorNombreUsuario(@Param("nombreUsuario") String nombreUsuario);

}
