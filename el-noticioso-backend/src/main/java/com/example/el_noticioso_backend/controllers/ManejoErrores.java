package com.example.el_noticioso_backend.controllers;

import com.example.el_noticioso_backend.dto.out.ErrorResponse;
import com.example.el_noticioso_backend.exceptions.AccesoDenegadoException;
import com.example.el_noticioso_backend.exceptions.ErrorDeNegocioException;
import com.example.el_noticioso_backend.exceptions.TokenInvalidoException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class ManejadorErrores {

    @ExceptionHandler(TokenInvalidoException.class)
    public ResponseEntity<ErrorResponse> token(TokenInvalidoException e) {
        return respuesta(HttpStatus.UNAUTHORIZED, e.getMessage());
    }

    @ExceptionHandler(AccesoDenegadoException.class)
    public ResponseEntity<ErrorResponse> acceso(AccesoDenegadoException e) {
        return respuesta(HttpStatus.FORBIDDEN, e.getMessage());
    }

    /** Errores de negocio y de la base (RAISE EXCEPTION de los procedimientos). */
    @ExceptionHandler(ErrorDeNegocioException.class)
    public ResponseEntity<ErrorResponse> negocio(ErrorDeNegocioException e) {
        return respuesta(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    /** Bean Validation sobre el cuerpo (@Valid @RequestBody). */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> validacionCuerpo(MethodArgumentNotValidException e) {
        String mensaje = e.getBindingResult().getFieldErrors().stream()
                .map(FieldError::getDefaultMessage)
                .findFirst()
                .orElse("Datos inválidos.");
        return respuesta(HttpStatus.BAD_REQUEST, mensaje);
    }

    /** Bean Validation sobre parámetros (@PathVariable con @Positive, etc.). */
    @ExceptionHandler(HandlerMethodValidationException.class)
    public ResponseEntity<ErrorResponse> validacionParametros(HandlerMethodValidationException e) {
        return respuesta(HttpStatus.BAD_REQUEST, "Parámetros inválidos.");
    }

    /** Valor de parámetro con tipo incorrecto, por ejemplo ?categoria=XYZ o ?id=abc. */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> tipoParametro(MethodArgumentTypeMismatchException e) {
        return respuesta(HttpStatus.BAD_REQUEST, "Valor inválido para " + e.getName() + ".");
    }

    /** JSON mal formado o enum que no existe en el cuerpo. */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> cuerpo(HttpMessageNotReadableException e) {
        return respuesta(HttpStatus.BAD_REQUEST, "El cuerpo de la petición no es válido.");
    }

    private ResponseEntity<ErrorResponse> respuesta(HttpStatus estado, String mensaje) {
        return ResponseEntity.status(estado).body(new ErrorResponse(mensaje));
    }
}