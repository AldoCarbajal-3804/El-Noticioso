package com.example.el_noticioso_backend.services;

import com.example.el_noticioso_backend.dto.in.FavoritoRequest;
import com.example.el_noticioso_backend.dto.out.FavoritoResponse;
import com.example.el_noticioso_backend.entities.Usuario;
import com.example.el_noticioso_backend.entities.enums.CategoriaEnum;
import com.example.el_noticioso_backend.entities.enums.UbicacionEnum;
import com.example.el_noticioso_backend.repositories.FavoritoJPA;
import com.example.el_noticioso_backend.repositories.UsuarioJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Service
public class FavoritoService {

    @Autowired
    private FavoritoJPA favoritoJPA;

    @Autowired
    private UsuarioJPA usuarioJPA;

    @Autowired
    private IdentidadDbService identidad;

    @Transactional
    public void agregar(UsuarioAutenticado usuario, FavoritoRequest request) {
        identidad.aplicar(usuario);
        try {
            favoritoJPA.agregarFavorito(usuario.correo(), request.idNoticia());
        } catch (RuntimeException e) {
            throw ErrorDeNegocioException.desdeBaseDeDatos(e);
        }
    }

    @Transactional
    public void eliminar(UsuarioAutenticado usuario, FavoritoRequest request) {
        identidad.aplicar(usuario);
        try {
            favoritoJPA.eliminarFavorito(usuario.correo(), request.idNoticia());
        } catch (RuntimeException e) {
            throw ErrorDeNegocioException.desdeBaseDeDatos(e);
        }
    }

    /**
     * Favoritos del usuario autenticado. El procedimiento recibe el nombre de usuario,
     * así que primero se obtiene a partir del correo del token.
     */
    @Transactional(readOnly = true)
    public List<FavoritoResponse> listar(UsuarioAutenticado usuario) {
        String nombreUsuario = usuarioJPA.findByCorreo(usuario.correo())
                .map(Usuario::getUsuario)
                .orElseThrow(() -> new ErrorDeNegocioException("No se encontró el usuario."));

        return favoritoJPA.listarFavoritosPorNombreUsuario(nombreUsuario).stream()
                .map(this::aRespuesta)
                .toList();
    }

    // Orden de columnas de listar_favoritos_por_nombre_usuario:
    // id_favorito, id_noticia, titulo, descripcion, resumen, imagen, autor, fecha, categoria, ubicacion
    private FavoritoResponse aRespuesta(Object[] fila) {
        return new FavoritoResponse(
                ((Number) fila[0]).longValue(),
                ((Number) fila[1]).longValue(),
                (String) fila[2],
                (String) fila[3],
                (String) fila[4],
                (String) fila[5],
                (String) fila[6],
                aOffsetDateTime(fila[7]),
                CategoriaEnum.valueOf((String) fila[8]),
                UbicacionEnum.valueOf((String) fila[9])
        );
    }

    // Según el driver, una columna timestamptz llega como OffsetDateTime o como Timestamp.
    private OffsetDateTime aOffsetDateTime(Object valor) {
        if (valor == null) {
            return null;
        }
        if (valor instanceof OffsetDateTime odt) {
            return odt;
        }
        if (valor instanceof Timestamp ts) {
            return ts.toInstant().atOffset(ZoneOffset.UTC);
        }
        throw new IllegalStateException("Tipo de fecha inesperado: " + valor.getClass());
    }

}
