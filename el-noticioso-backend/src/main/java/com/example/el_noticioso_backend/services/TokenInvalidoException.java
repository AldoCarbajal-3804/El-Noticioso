package com.example.el_noticioso_backend.services;

/** El JWT no es válido, está expirado o no pertenece a un usuario autenticado. */
public class TokenInvalidoException extends RuntimeException {

    public TokenInvalidoException(String mensaje) {
        super(mensaje);
    }

    public TokenInvalidoException(String mensaje, Throwable causa) {
        super(mensaje, causa);
    }

}
