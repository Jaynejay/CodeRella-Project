package com.example.coderellaProject.controller;

import com.example.coderellaProject.dto.AdminUserCreationRequest;
import com.example.coderellaProject.model.Role;
import com.example.coderellaProject.model.User;
import com.example.coderellaProject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('SUPER_ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/pending")
    public ResponseEntity<List<User>> getPendingPaperSetters() {
        List<User> pendingUsers = userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.PAPER_SETTER && !user.isActive() && user.isProfileCompleted())
                .toList();
        System.out.println("Pending Paper Setters Found: " + pendingUsers.size());
        pendingUsers.forEach(user -> System.out.println(" - " + user.getEmail()));
        return ResponseEntity.ok(pendingUsers);
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<String> approvePaperSetter(@PathVariable Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null || user.isActive()) {
            return ResponseEntity.badRequest().body("Invalid or already approved user.");
        }
        user.setActive(true);
        userRepository.save(user);
        return ResponseEntity.ok("User approved successfully.");
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsersByRole(
            @RequestParam Role role,
            @RequestParam(required = false) Boolean active) {

        List<User> users = userRepository.findByRole(role);

        if (active != null) {
            users = users.stream()
                    .filter(user -> user.isActive() == active)
                    .toList();
        }

        return ResponseEntity.ok(users);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createUserByAdmin(
            @RequestBody AdminUserCreationRequest request,
            @RequestParam Role role
    ) {

        if (request.getEmail() == null || request.getEmail().trim().isEmpty() ||
                request.getPassword() == null || request.getPassword().trim().isEmpty() ||
                request.getUsername() == null || request.getUsername().trim().isEmpty() ||
                role == null) {
            return ResponseEntity.badRequest().body("Missing required fields: email, password, username.");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email is already used.");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);
        user.setActive(true); //not needed admin approval
        user.setProfileCompleted(false);  // user fills it later
        user.setFirstLogin(true);         // user must reset password on first login

        userRepository.save(user);
        return ResponseEntity.ok("User created successfully.");
    }


    @GetMapping("/user-summary")
    public ResponseEntity<Map<String, Object>> getUserSummary() {
        List<User> allUsers = userRepository.findAll();

        long total = allUsers.size();
        long active = allUsers.stream().filter(User::isActive).count();
        long inactive = total - active;

        Map<String, Long> roleCounts = allUsers.stream()
                .collect(Collectors.groupingBy(
                        user -> switch (user.getRole()) {
                            case PAPER_SETTER -> "Paper Setters";
                            case EXAM_ADMIN -> "Exam Administrator";
                            case PAYMENT_COORDINATOR -> "Payment Coordinator";
                            case COURSE_ADMIN -> "Course Administrator";
                            default -> "Other";
                        },
                        Collectors.counting()
                ));

        Map<String, Object> result = new HashMap<>();
        result.put("totalUsers", total);
        result.put("activeUsers", active);
        result.put("inactiveUsers", inactive);

        List<Map<String, Object>> roles = roleCounts.entrySet().stream().map(e -> {
            Map<String, Object> role = new HashMap<>();
            role.put("name", e.getKey());
            role.put("count", e.getValue());
            return role;
        }).toList();

        result.put("roles", roles);
        return ResponseEntity.ok(result);
    }
}
