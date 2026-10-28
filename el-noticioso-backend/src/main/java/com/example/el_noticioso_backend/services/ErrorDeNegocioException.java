package com.example.el_noticioso_backend.services;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Error que devuelve un procedimiento de la base (RAISE EXCEPTION) ya traducido a un mensaje legible,
 * por ejemplo "El correo ... ya se encuentra registrado.".
 */
public class ErrorDeNegocioException extends RuntimeException {

    // Captura el texto después de "ERROR:" (con o sin código SQLSTATE) hasta el fin de línea.
    private static final Pattern MENSAJE_SQL =
            Pattern.compile("ERROR:\\s+(?:[0-9A-Z]{5}:\\s+)?([^\\r\\n]+)");

    public ErrorDeNegocioException(String mensaje) {
        super(mensaje);
    }

    public ErrorDeNegocioException(String mensaje, Throwable causa) {
        super(mensaje, causa);
    }

    /**
     * Traduce la excepción de un procedimiento a ErrorDeNegocioException.
     * Si no es un error de la base, devuelve la excepción original sin cambios.
     */
    public static RuntimeException desdeBaseDeDatos(RuntimeException e) {
        for (Throwable t = e; t != null; t = t.getCause()) {
            String msg = t.getMessage();
            if (msg != null) {
                Matcher m = MENSAJE_SQL.matcher(msg);
                if (m.find()) {
                    return new ErrorDeNegocioException(m.group(1).trim(), e);
                }
            }
        }
        return e;
    }

}
