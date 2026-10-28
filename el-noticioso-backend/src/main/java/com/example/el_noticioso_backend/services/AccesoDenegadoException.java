package com.example.el_noticioso_backend.services;

/** El usuario autenticado no tiene permiso para la operación (por ejemplo, no es administrador). */
public class AccesoDenegadoException extends RuntimeException {

    public AccesoDenegadoException(String mensaje) {
        super(mensaje);
    }

}
