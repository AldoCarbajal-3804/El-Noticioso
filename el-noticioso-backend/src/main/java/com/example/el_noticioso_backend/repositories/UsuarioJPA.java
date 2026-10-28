package com.example.el_noticioso_backend.repositories;


import com.example.el_noticioso_backend.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UsuarioJPA extends JpaRepository<Usuario,Long> {

    Optional<Usuario> findByCorreo(String correo);
    boolean existsByCorreo(String correo);
    boolean existsByUsuario(String usuario);

    @Procedure(procedureName = "registrar_usuario")
    void registrarUsuario(
            @Param("p_nombre") String nombre,
            @Param("p_apellidos") String apellidos,
            @Param("p_telefono") String telefono,
            @Param("p_usuario") String usuario,
            @Param("p_correo") String correo,
            @Param("p_contrasena") String contrasena
    );

    @Procedure(procedureName = "registrar_admin_user")
    void registrarAdminUser(
            @Param("p_nombre") String nombre,
            @Param("p_apellidos") String apellidos,
            @Param("p_telefono") String telefono,
            @Param("p_usuario") String usuario,
            @Param("p_correo") String correo,
            @Param("p_contrasena") String contrasena,
            @Param("p_nombre_rol") String nombreRol
    );

    @Procedure(procedureName = "actualizar_perfil_usuario")
    void actualizarPerfilUsuario(
            @Param("p_correo") String correo,
            @Param("p_nuevo_nombre") String nuevoNombre,
            @Param("p_new_apellidos") String nuevoApellidos,
            @Param("p_nuevo_telefono") String nuevoTelefono,
            @Param("p_nuevo_usuario") String nuevoUsuario
    );

    @Procedure(procedureName = "actualizar_contrasena_user")
    void actualizarContrasenaUser(
            @Param("p_correo") String correo,
            @Param("p_nueva_contrasena") String nuevaContrasena
    );

}
