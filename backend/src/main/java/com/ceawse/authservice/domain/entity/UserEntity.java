package com.ceawse.authservice.domain.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String nickname;
    private String email;
    private String passwordHash;
    private String fullName; // ФИО

    private Boolean active;
    private Boolean admin;
    private Boolean superuser;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "user_roles")
    public List<RoleEntity> roles = new ArrayList<>();
}