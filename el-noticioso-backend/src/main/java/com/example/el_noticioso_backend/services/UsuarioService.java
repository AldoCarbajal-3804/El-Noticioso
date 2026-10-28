package com.example.el_noticioso_backend.services;

import com.example.el_noticioso_backend.dto.in.CambioContrasenaRequest;
import com.example.el_noticioso_backend.dto.in.PerfilRequest;
import com.example.el_noticioso_backend.dto.in.RegistroAdminRequest;
import com.example.el_noticioso_backend.dto.in.RegistroRequest;
import com.example.el_noticioso_backend.dto.out.RegistroResponse;
import com.example.el_noticioso_backend.dto.out.UsuarioAutenticado;
import com.example.el_noticioso_backend.entities.Usuario;
import com.example.el_noticioso_backend.exceptions.ErrorDeNegocioException;
import com.example.el_noticioso_backend.repositories.UsuarioJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioJPA usuarioJPA;

    @Autowired
    private IdentidadDbService identidad;

    /** Registro público (sin sesión). El procedimiento asigna el rol USUARIO. */
    @Transactional
    public RegistroResponse registrarUsuario(RegistroRequest request) {
        try {
            usuarioJPA.registrarUsuario(
                    request.nombre(),
                    request.apellidos(),
                    request.telefono(),
                    request.usuario(),
                    request.correo(),
                    request.contrasena()
            );
        } catch (RuntimeException e) {
            throw ErrorDeNegocioException.desdeBaseDeDatos(e);
        }
        return aRespuesta(obtenerPorCorreo(request.correo()));
    }

    /** Perfil del usuario autenticado. */
    @Transactional(readOnly = true)
    public RegistroResponse obtenerPerfil(UsuarioAutenticado usuario) {
        return aRespuesta(obtenerPorCorreo(usuario.correo()));
    }

    /** Actualiza solo el perfil del propio usuario (nombre, apellidos, teléfono, nombre de usuario). */
    @Transactional
    public void actualizarPerfil(UsuarioAutenticado usuario, PerfilRequest request) {
        identidad.aplicar(usuario);
        try {
            usuarioJPA.actualizarPerfilUsuario(
                    usuario.correo(),
                    request.nombre(),
                    request.apellidos(),
                    request.telefono(),
                    request.usuario()
            );
        } catch (RuntimeException e) {
            throw ErrorDeNegocioException.desdeBaseDeDatos(e);
        }
    }

    /** Cambia la contraseña del propio usuario. */
    @Transactional
    public void cambiarContrasena(UsuarioAutenticado usuario, CambioContrasenaRequest request) {
        identidad.aplicar(usuario);
        try {
            usuarioJPA.actualizarContrasenaUser(usuario.correo(), request.nuevaContrasena());
        } catch (RuntimeException e) {
            throw ErrorDeNegocioException.desdeBaseDeDatos(e);
        }
    }

    /** Crea un usuario con cualquier rol. Solo administradores (lo valida el procedimiento). */
    @Transactional
    public void registrarAdmin(UsuarioAutenticado usuario, RegistroAdminRequest request) {
        identidad.aplicar(usuario);
        try {
            usuarioJPA.registrarAdminUser(
                    request.nombre(),
                    request.apellidos(),
                    request.telefono(),
                    request.usuario(),
                    request.correo(),
                    request.contrasena(),
                    request.rol().name()
            );
        } catch (RuntimeException e) {
            throw ErrorDeNegocioException.desdeBaseDeDatos(e);
        }
    }

    private Usuario obtenerPorCorreo(String correo) {
        return usuarioJPA.findByCorreo(correo)
                .orElseThrow(() -> new ErrorDeNegocioException("No se encontró el usuario."));
    }

    private RegistroResponse aRespuesta(Usuario u) {
        return new RegistroResponse(
                u.getNombre(),
                u.getApellidos(),
                u.getTelefono(),
                u.getCorreo(),
                u.getUsuario()
        );
    }

}
