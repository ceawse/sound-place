package com.ceawse.authservice.service;

import com.ceawse.authservice.domain.api.auth.AuthResponse;
import com.ceawse.authservice.domain.api.registration.RegistrationReq;

public interface RegistrationService {

    String register(RegistrationReq req);

    AuthResponse login(String email, String password);
}
