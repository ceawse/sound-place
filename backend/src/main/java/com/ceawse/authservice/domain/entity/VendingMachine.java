package com.ceawse.authservice.domain.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "vending_machines")
public class VendingMachine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String serialNumber;

    @Column(unique = true)
    private String inventoryNumber;

    private String name;
    private String model;
    private String address;
    private String status; // Работает, Вышел из строя, Обслуживание
    private String country;

    private LocalDate manufactureDate;
    private LocalDate installationDate;
    private LocalDate lastCheckDate;

    private Integer checkInterval; // Месяцы
    private Integer resourceHours;
    private Integer serviceTime;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;
}