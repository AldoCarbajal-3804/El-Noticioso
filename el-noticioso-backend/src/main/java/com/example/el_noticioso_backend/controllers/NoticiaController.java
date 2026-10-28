package com.example.el_noticioso_backend.controllers;

import com.example.el_noticioso_backend.dto.in.NoticiaRequest;
import com.example.el_noticioso_backend.dto.out.NoticiaResponse;
import com.example.el_noticioso_backend.entities.enums.CategoriaEnum;
import com.example.el_noticioso_backend.entities.enums.UbicacionEnum;
import com.example.el_noticioso_backend.services.JwtService;
import com.example.el_noticioso_backend.services.NoticiaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/noticias")
public class NoticiaController {

    private final NoticiaService noticiaService;
    private final JwtService jwtService;

    public NoticiaController(NoticiaService noticiaService, JwtService jwtService) {
        this.noticiaService = noticiaService;
        this.jwtService = jwtService;
    }

    /** Público. Filtros opcionales: ?categoria=&ubicacion=&busqueda= */
    @GetMapping
    public List<NoticiaResponse> listar(
            @RequestParam(required = false) CategoriaEnum categoria,
            @RequestParam(required = false) UbicacionEnum ubicacion,
            @RequestParam(required = false) String busqueda
    ) {
        return noticiaService.listar(categoria, ubicacion, busqueda);
    }

    /** Solo administrador (lo valida el servicio). */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void crear(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @Valid @RequestBody NoticiaRequest request
    ) {
        noticiaService.crear(AutenticacionHeader.desde(jwtService, authorization), request);
    }

    /** Solo administrador. */
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void actualizar(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable Long id,
            @Valid @RequestBody NoticiaRequest request
    ) {
        noticiaService.actualizar(AutenticacionHeader.desde(jwtService, authorization), id, request);
    }

    /** Solo administrador. */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable Long id
    ) {
        noticiaService.eliminar(AutenticacionHeader.desde(jwtService, authorization), id);
    }
}