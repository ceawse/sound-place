package com.ceawse.authservice.service.impl;

import com.ceawse.authservice.domain.api.registration.RegistrationReq;
import com.ceawse.authservice.domain.entity.UserEntity;
import com.ceawse.authservice.repository.UserRepository;
import com.ceawse.authservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DefaultUserService implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserEntity saveAndActivate(RegistrationReq req) {
        UserEntity user = new UserEntity();
        user.setNickname(req.getNickname());
        user.setEmail(req.getEmail());

        user.setPasswordHash(passwordEncoder.encode(req.getPassword()));

        user.setActive(true);
        user.setAdmin(false);
        user.setSuperuser(false);

        return userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}