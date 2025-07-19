package com.example.coderellaProject.controller;

import com.example.coderellaProject.dto.AuthRequest;
import com.example.coderellaProject.dto.AuthResponse;
import com.example.coderellaProject.model.Role;
import com.example.coderellaProject.model.User;
import com.example.coderellaProject.repository.UserRepository;
import com.example.coderellaProject.service.ActivityService;
import com.example.coderellaProject.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private ActivityService activityService;

    @Autowired private AuthenticationManager authManager;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestParam String email,
                                         @RequestParam String username,
                                         @RequestParam String password) {


        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body("Email is already registered");
        }

        if (userRepository.existsByUsername(username)) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }

        // Only allow PAPER_SETTER
        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.PAPER_SETTER);
        user.setActive(false);              // needs admin approval
        user.setFirstLogin(false);
        user.setProfileCompleted(false);// profile will be completed later

        userRepository.save(user);
        return ResponseEntity.ok("Signup successful. Username: " + user.getUsername());
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        User user = userRepository.findByUsername(request.getUsername());

        // ✅ Log the activity
        activityService.logActivity(
                user.getUsername(),
                "LOGIN",
                "User logged in successfully"
        );

        String token = jwtUtil.generateToken(user);
        return ResponseEntity.ok(new AuthResponse(token, user.getRole().name(), user.getUsername(),user.isActive(),user.isProfileCompleted(),user.isFirstLogin()));
    }



}
