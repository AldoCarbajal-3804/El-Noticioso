package com.example.el_noticioso_backend.controllers;

import com.example.el_noticioso_backend.dto.out.UsuarioAutenticado;
import com.example.el_noticioso_backend.exceptions.TokenInvalidoException;
import com.example.el_noticioso_backend.services.JwtService;

/** Extrae el JWT de la cabecera "Authorization: Bearer <token>" y lo valida. */
final class AutenticacionHeader {

    private static final String PREFIJO = "Bearer ";

    private AutenticacionHeader() {
    }

    static UsuarioAutenticado desde(JwtService jwtService, String authorization) {
        if (authorization == null || !authorization.startsWith(PREFIJO)) {
            throw new TokenInvalidoException("Falta el token de autenticación.");
        }
        return jwtService.validar(authorization.substring(PREFIJO.length()).trim());
    }
}