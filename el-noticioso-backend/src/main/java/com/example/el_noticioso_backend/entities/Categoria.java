package com.example.el_noticioso_backend.entities;


import com.example.el_noticioso_backend.entities.enums.CategoriaEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name  = "categoria")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    private CategoriaEnum categoria;

}
