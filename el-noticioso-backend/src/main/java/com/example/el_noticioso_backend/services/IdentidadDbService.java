package com.example.el_noticioso_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Pone la identidad del JWT validado en la transacción actual con set_config('request.jwt.claims', ..., true).
 * Así auth.jwt(), es_admin() y las validaciones de los procedimientos ven el mismo usuario que Spring autenticó.
 * El ajuste es local a la transacción y se borra al terminar.
 *
 * Los métodos exigen una transacción activa (propagation MANDATORY) para que la identidad
 * y la llamada al procedimiento usen la misma conexión.
 */
@Service
public class IdentidadDbService {

    @Autowired
    private JdbcTemplate jdbc;

    @Transactional(propagation = Propagation.MANDATORY)
    public void aplicar(UsuarioAutenticado usuario) {
        String claims = "{"
                + "\"sub\":\"" + usuario.authId() + "\","
                + "\"email\":\"" + escapar(usuario.correo()) + "\","
                + "\"role\":\"authenticated\""
                + "}";
        jdbc.queryForObject("SELECT set_config('request.jwt.claims', ?, true)", String.class, claims);
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public boolean esAdmin() {
        Boolean resultado = jdbc.queryForObject("SELECT public.es_admin()", Boolean.class);
        return Boolean.TRUE.equals(resultado);
    }

    private static String escapar(String valor) {
        return valor.replace("\\", "\\\\").replace("\"", "\\\"");
    }

}
