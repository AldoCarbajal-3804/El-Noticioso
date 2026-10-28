package com.example.el_noticioso_backend.controllers;

import com.example.el_noticioso_backend.dto.in.PerfilRequest;
import com.example.el_noticioso_backend.dto.out.RegistroResponse;
import com.example.el_noticioso_backend.dto.out.UsuarioAutenticado;
import com.example.el_noticioso_backend.services.JwtService;
import com.example.el_noticioso_backend.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/perfil")
public class PerfilController {

    private final UsuarioService usuarioService;
    private final JwtService jwtService;

    public PerfilController(UsuarioService usuarioService, JwtService jwtService) {
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
    }

    /** Perfil del usuario autenticado. */
    @GetMapping
    public RegistroResponse obtener(
            @RequestHeader(value = "Authorization", required = false) String authorization
    ) {
        UsuarioAutenticado usuario = AutenticacionHeader.desde(jwtService, authorization);
        return usuarioService.obtenerPerfil(usuario);
    }

    /** Actualiza solo el perfil propio. Devuelve el perfil ya actualizado. */
    @PutMapping
    public RegistroResponse actualizar(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @Valid @RequestBody PerfilRequest request
    ) {
        UsuarioAutenticado usuario = AutenticacionHeader.desde(jwtService, authorization);
        usuarioService.actualizarPerfil(usuario, request);
        return usuarioService.obtenerPerfil(usuario);
    }
}