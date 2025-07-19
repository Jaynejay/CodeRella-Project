package com.example.coderellaProject;

import com.example.coderellaProject.model.Role;
import com.example.coderellaProject.model.User;
import com.example.coderellaProject.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class CoderellaProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(CoderellaProjectApplication.class, args);
    }

    @Bean
    CommandLineRunner run(UserRepository userRepository, PasswordEncoder encoder) {
        return args -> {
            if (!userRepository.existsByUsername("ADMIN001")) {
                User admin = new User();
                admin.setUsername("ADMIN001");
                admin.setEmail("admin@gmail.com");
                admin.setPassword(encoder.encode("admin")); // plaintext = admin
                admin.setRole(Role.SUPER_ADMIN);
                admin.setActive(true);
                admin.setProfileCompleted(true);
                userRepository.save(admin);
            }
        };
    }
}
