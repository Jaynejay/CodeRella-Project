package com.example.coderellaProject.controller;

import com.example.coderellaProject.model.PasswordResetToken;
import com.example.coderellaProject.model.User;
import com.example.coderellaProject.repository.UserRepository;
import com.example.coderellaProject.dto.PasswordResetRequest;
import com.example.coderellaProject.repository.PasswordResetTokenRepository;
import com.example.coderellaProject.service.EmailService;
import com.example.coderellaProject.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;
import java.time.LocalDateTime;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class PasswordResetController {

    private final PasswordResetTokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final ActivityService activityService;

    /**
     * Step A: Request password reset
     * Generate token and save it to database
     */

    @PostMapping("/request-password-reset")
    public ResponseEntity<String> requestReset(@RequestParam String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User with given email not found.");
        }

        User user = optionalUser.get();

        // ✅ Generate and save token to DB
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setEmail(user.getEmail());
        resetToken.setToken(token);
        resetToken.setUsed(false);
        resetToken.setExpiry(LocalDateTime.now().plusMinutes(30));

        tokenRepository.save(resetToken); // ✅ persist to DB

        emailService.sendResetEmail(email, token);

        // Simulate sending email
        System.out.println("Password reset token for " + email + ": " + token);

        return ResponseEntity.ok("Reset link sent to email (mocked). Use token: " + token);
    }


    /**
     * Step B: Confirm password reset with token and new password
     */

    @PostMapping("/confirm-password-reset")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetRequest request) {
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Passwords do not match.");
        }
        PasswordResetToken resetToken = tokenRepository.findByToken(request.getToken())
                .orElseThrow(() -> new RuntimeException("Invalid or expired token."));

        if (resetToken.isUsed() || resetToken.getExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Token is invalid or expired.");
        }

        User user = userRepository.findByEmail(resetToken.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found."));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setFirstLogin(false);
        userRepository.save(user);

        resetToken.setUsed(true);
        tokenRepository.save(resetToken);

        // ✅ Log the password reset activity
        activityService.logActivity(
                user.getUsername(),
                "PASSWORD_RESET",
                "Password reset successfully using token"
        );

        return ResponseEntity.ok("Password reset successfully.");
    }

}