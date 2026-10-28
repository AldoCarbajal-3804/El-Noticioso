package com.example.el_noticioso_backend.services;

import com.example.el_noticioso_backend.dto.out.UsuarioAutenticado;
import com.example.el_noticioso_backend.exceptions.TokenInvalidoException;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.jwk.source.RemoteJWKSet;
import com.nimbusds.jose.proc.BadJOSEException;
import com.nimbusds.jose.proc.JWSVerificationKeySelector;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import com.nimbusds.jwt.proc.DefaultJWTClaimsVerifier;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.util.Set;
import java.util.UUID;

/**
 * Valida los JWT que emite Supabase Auth con sus claves públicas (JWKS).
 * Spring nunca emite tokens: solo verifica la firma, el emisor, la audiencia y la expiración.
 */
@Service
public class JwtService {

    private static final String AUDIENCIA = "authenticated";
    private static final String ROL_ESPERADO = "authenticated";

    private final ConfigurableJWTProcessor<SecurityContext> procesador;

    public JwtService(
            @Value("${supabase.jwt.jwks-url}") String jwksUrl,
            @Value("${supabase.jwt.issuer}") String issuer
    ) throws MalformedURLException {
        // Las claves se descargan y se cachean; nimbus refresca el caché si aparece un kid nuevo.
        JWKSource<SecurityContext> claves = new RemoteJWKSet<>(new URL(jwksUrl));

        DefaultJWTProcessor<SecurityContext> p = new DefaultJWTProcessor<>();
        p.setJWSKeySelector(new JWSVerificationKeySelector<>(
                Set.of(JWSAlgorithm.ES256, JWSAlgorithm.RS256),
                claves
        ));
        p.setJWTClaimsSetVerifier(new DefaultJWTClaimsVerifier<>(
                new JWTClaimsSet.Builder()
                        .issuer(issuer)
                        .audience(AUDIENCIA)
                        .build(),
                Set.of("sub", "exp", "iss", "aud")
        ));
        this.procesador = p;
    }

    /**
     * Valida el token y devuelve la identidad. Lanza TokenInvalidoException si no es válido.
     */
    public UsuarioAutenticado validar(String token) {
        try {
            JWTClaimsSet claims = procesador.process(token, null);

            if (!ROL_ESPERADO.equals(claims.getStringClaim("role"))) {
                throw new TokenInvalidoException("El token no pertenece a un usuario autenticado.");
            }

            String correo = claims.getStringClaim("email");
            if (correo == null || correo.isBlank()) {
                throw new TokenInvalidoException("El token no contiene correo.");
            }

            return new UsuarioAutenticado(UUID.fromString(claims.getSubject()), correo);

        } catch (ParseException | JOSEException | BadJOSEException | IllegalArgumentException e) {
            throw new TokenInvalidoException("Token inválido o expirado.", e);
        }
    }

}
