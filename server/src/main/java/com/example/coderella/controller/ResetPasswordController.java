package com.example.coderella.controller;

import com.example.coderella.entity.User;
import com.example.coderella.repository.UserRepository;
import com.example.coderella.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class ResetPasswordController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ActivityService activityService;

    @PutMapping("/reset-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> resetPassword(@RequestParam String currentPassword,
                                                @RequestParam String newPassword,
                                                Authentication auth) {
        String username = auth.getName();
        User user = userRepository.findByUsername(username) // I changed here User user = userRepository.findByUsername(username)
                //.orElseThrow(() -> new RuntimeException("User not found"));
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 1. Validate current password
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            return ResponseEntity.badRequest().body("Current password is incorrect.");
        }

        // 2. Prevent reuse of the same password
        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            return ResponseEntity.badRequest().body("New password must be different from the current password.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setFirstLogin(false); // disable first login after password reset
        userRepository.save(user);

        // ✅ Log the activity
        activityService.logActivity(
                username,
                "PASSWORD_CHANGE",
                "User changed password using current password verification"
        );

        return ResponseEntity.ok("Password updated successfully.");
    }
}
