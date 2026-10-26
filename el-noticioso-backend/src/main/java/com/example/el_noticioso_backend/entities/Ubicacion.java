package com.example.el_noticioso_backend.entities;


import com.example.el_noticioso_backend.entities.enums.UbicacionEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "ubicacion")
@AllArgsConstructor
@Data
@NoArgsConstructor
public class Ubicacion {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    private UbicacionEnum categoria;

}
