package com.ceawse.authservice.controller;

import com.ceawse.authservice.domain.api.auth.AuthResponse;
import com.ceawse.authservice.domain.api.registration.RegistrationReq;
import com.ceawse.authservice.domain.entity.UserEntity;
import com.ceawse.authservice.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final RegistrationService registrationService;

    @PostMapping("/registration")
    public ResponseEntity<?> register(@RequestBody RegistrationReq req) {
        String token = registrationService.register(req);
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestParam String email, @RequestParam String password) {
        AuthResponse response = registrationService.login(email, password);
        return ResponseEntity.ok(response);
    }
}