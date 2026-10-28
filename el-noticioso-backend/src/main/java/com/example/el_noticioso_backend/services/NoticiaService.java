package com.example.el_noticioso_backend.services;

import com.example.el_noticioso_backend.dto.in.NoticiaRequest;
import com.example.el_noticioso_backend.dto.out.NoticiaResponse;
import com.example.el_noticioso_backend.dto.out.UsuarioAutenticado;
import com.example.el_noticioso_backend.entities.enums.CategoriaEnum;
import com.example.el_noticioso_backend.entities.enums.UbicacionEnum;
import com.example.el_noticioso_backend.entities.views.NoticiaView;
import com.example.el_noticioso_backend.exceptions.AccesoDenegadoException;
import com.example.el_noticioso_backend.exceptions.ErrorDeNegocioException;
import com.example.el_noticioso_backend.repositories.NoticiaJPA;
import com.example.el_noticioso_backend.repositories.NoticiaViewJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.Comparator;
import java.util.List;

@Service
public class NoticiaService {

    @Autowired
    private NoticiaJPA noticiaJPA;

    @Autowired
    private NoticiaViewJPA noticiaViewJPA;

    @Autowired
    private IdentidadDbService identidad;

    /** Listado público con filtros opcionales. Ordenado por fecha, más reciente primero. */
    @Transactional(readOnly = true)
    public List<NoticiaResponse> listar(CategoriaEnum categoria, UbicacionEnum ubicacion, String busqueda) {
        return noticiaViewJPA.filtrarNoticias(
                        categoria == null ? null : categoria.name(),
                        ubicacion == null ? null : ubicacion.name(),
                        busqueda == null || busqueda.isBlank() ? null : busqueda.trim()
                ).stream()
                .sorted(Comparator.comparing(
                        NoticiaView::getFecha,
                        Comparator.nullsLast(Comparator.<OffsetDateTime>reverseOrder())
                ))
                .map(this::aRespuesta)
                .toList();
    }

    /** Solo administradores. */
    @Transactional
    public void crear(UsuarioAutenticado usuario, NoticiaRequest request) {
        exigirAdmin(usuario);
        try {
            noticiaJPA.registrarNoticia(
                    request.titulo(),
                    request.autor(),
                    request.descripcion(),
                    request.imagen(),
                    request.resumen(),
                    request.categoria().name(),
                    request.ubicacion().name()
            );
        } catch (RuntimeException e) {
            throw ErrorDeNegocioException.desdeBaseDeDatos(e);
        }
    }

    /** Solo administradores. */
    @Transactional
    public void actualizar(UsuarioAutenticado usuario, Long idNoticia, NoticiaRequest request) {
        exigirAdmin(usuario);
        try {
            noticiaJPA.actualizarNoticia(
                    idNoticia,
                    request.titulo(),
                    request.autor(),
                    request.descripcion(),
                    request.imagen(),
                    request.resumen(),
                    request.categoria().name(),
                    request.ubicacion().name()
            );
        } catch (RuntimeException e) {
            throw ErrorDeNegocioException.desdeBaseDeDatos(e);
        }
    }

    /** Solo administradores. */
    @Transactional
    public void eliminar(UsuarioAutenticado usuario, Long idNoticia) {
        exigirAdmin(usuario);
        try {
            noticiaJPA.eliminarNoticia(idNoticia);
        } catch (RuntimeException e) {
            throw ErrorDeNegocioException.desdeBaseDeDatos(e);
        }
    }

    private void exigirAdmin(UsuarioAutenticado usuario) {
        identidad.aplicar(usuario);
        if (!identidad.esAdmin()) {
            throw new AccesoDenegadoException("Solo un administrador puede gestionar noticias.");
        }
    }

    private NoticiaResponse aRespuesta(NoticiaView v) {
        return new NoticiaResponse(
                v.getId(),
                v.getTitulo(),
                v.getAutor(),
                v.getDescripcion(),
                v.getResumen(),
                v.getImagen(),
                v.getFecha(),
                CategoriaEnum.valueOf(v.getCategoria()),
                UbicacionEnum.valueOf(v.getUbicacion())
        );
    }

}
