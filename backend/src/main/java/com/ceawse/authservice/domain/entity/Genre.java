package com.ceawse.authservice.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "genres")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Название жанра не может быть пустым")
    @Column(unique = true, nullable = false)
    private String name;
}