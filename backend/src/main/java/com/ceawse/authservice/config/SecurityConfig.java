package com.ceawse.authservice.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Отключаем CSRF, так как он блокирует POST запросы от фронтенда
                .csrf(AbstractHttpConfigurer::disable)

                // 2. Разрешаем абсолютно все запросы без авторизации
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                )

                // 3. Отключаем форму логина и базовую аутентификацию
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable);

        return http.build();
    }
}