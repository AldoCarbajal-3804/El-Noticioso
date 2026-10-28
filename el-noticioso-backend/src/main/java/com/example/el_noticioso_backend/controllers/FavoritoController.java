package com.example.el_noticioso_backend.controllers;

import com.example.el_noticioso_backend.dto.in.FavoritoRequest;
import com.example.el_noticioso_backend.dto.out.FavoritoResponse;
import com.example.el_noticioso_backend.services.FavoritoService;
import com.example.el_noticioso_backend.services.JwtService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favoritos")
public class FavoritoController {

    private final FavoritoService favoritoService;
    private final JwtService jwtService;

    public FavoritoController(FavoritoService favoritoService, JwtService jwtService) {
        this.favoritoService = favoritoService;
        this.jwtService = jwtService;
    }

    /** Favoritos del usuario autenticado. */
    @GetMapping
    public List<FavoritoResponse> listar(
            @RequestHeader(value = "Authorization", required = false) String authorization
    ) {
        return favoritoService.listar(AutenticacionHeader.desde(jwtService, authorization));
    }

    /** Agrega una noticia a favoritos. Body: { "idNoticia": 1 } */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void agregar(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @Valid @RequestBody FavoritoRequest request
    ) {
        favoritoService.agregar(AutenticacionHeader.desde(jwtService, authorization), request);
    }

    /** Quita una noticia de favoritos. El id va en la ruta, no en el cuerpo. */
    @DeleteMapping("/{idNoticia}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable @Positive Long idNoticia
    ) {
        favoritoService.eliminar(
                AutenticacionHeader.desde(jwtService, authorization),
                new FavoritoRequest(idNoticia)
        );
    }
}