package com.ceawse.authservice.domain.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "sales")
@Data
public class Sale {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long machineId;
    private Double amount;
    private String paymentMethod;
    private LocalDate saleDate;
}