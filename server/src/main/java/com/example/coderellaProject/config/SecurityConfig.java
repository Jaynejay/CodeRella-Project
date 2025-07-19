package com.example.coderellaProject.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain disableSecurity(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())                // turn off CSRF
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()                // allow every request
                );
        return http.build();
    }
}
