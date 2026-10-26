package com.example.el_noticioso_backend.entities;

import com.example.el_noticioso_backend.entities.enums.RolEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "rol")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private RolEnum rol;

}
