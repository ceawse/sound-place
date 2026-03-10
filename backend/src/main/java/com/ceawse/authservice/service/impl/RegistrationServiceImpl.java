package com.ceawse.authservice.service.impl;

import com.ceawse.authservice.domain.api.auth.AuthResponse;
import com.ceawse.authservice.domain.api.registration.RegistrationReq;
import com.ceawse.authservice.domain.entity.UserEntity;
import com.ceawse.authservice.repository.UserRepository;
import com.ceawse.authservice.service.RegistrationService;
import com.ceawse.authservice.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegistrationServiceImpl implements RegistrationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Override
    public String register(RegistrationReq req) {
        UserEntity user = new UserEntity();
        user.setNickname(req.getNickname());
        user.setEmail(req.getEmail());
        user.setFullName(req.getNickname()); // Временная заглушка для ФИО
        user.setPasswordHash(passwordEncoder.encode(req.getPassword()));
        user.setActive(true);
        user.setAdmin(true);
        user.setSuperuser(true);
        userRepository.save(user);
        return jwtUtils.generateToken(user.getEmail());
    }

    public AuthResponse login(String email, String password) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new RuntimeException("Неверный пароль");
        }

        String token = jwtUtils.generateToken(user.getEmail());
        String role = Boolean.TRUE.equals(user.getAdmin()) ? "ADMIN" : "ENGINEER";

        // Возвращаем AuthResponse с ником
        return new AuthResponse(token, user.getNickname(), role);
    }
}