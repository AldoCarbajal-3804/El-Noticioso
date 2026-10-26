package com.example.el_noticioso_backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "usuario")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String apellidos;

    private String telefono;

    private String correo;

    private String contrasena;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name  = "id_rol", nullable = false)
    private Rol rol;

}
