package com.example.coderella;

import com.example.coderella.entity.Role;
import com.example.coderella.entity.User;
import com.example.coderella.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableScheduling
@SpringBootApplication
public class CoderellaApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoderellaApplication.class, args);
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
