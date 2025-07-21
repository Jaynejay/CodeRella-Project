package com.example.coderella.controller;

import com.example.coderella.dto.AdminUserCreationRequest;
import com.example.coderella.dto.AdminUserUpdateRequest;
import com.example.coderella.entity.Role;
import com.example.coderella.entity.User;
import com.example.coderella.repository.UserRepository;
import com.example.coderella.dto.UserSummaryDto;
import com.example.coderella.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('SUPER_ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    @GetMapping("/pending")
    public ResponseEntity<List<User>> getPendingPaperSetters() {
        List<User> pendingUsers = userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.PAPER_SETTER && !user.isActive() && user.isProfileCompleted() && !Boolean.TRUE.equals(user.isScheduledForDeletion()))
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

   @GetMapping("/users/all")
    @PreAuthorize("hasAuthority('SUPER_ADMIN')")
    public ResponseEntity<List<UserSummaryDto>> getAllUserSummaries() {
        List<UserSummaryDto> userSummaries = userService.getAllUsers();
        return ResponseEntity.ok(userSummaries);
    }

    @GetMapping("/users/{id}")
    @PreAuthorize("hasAuthority('SUPER_ADMIN')")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PutMapping("/users/{id}")
    @PreAuthorize("hasAuthority('SUPER_ADMIN')")
    public ResponseEntity<?> updateUserByAdmin(
            @PathVariable Long id,
            @RequestBody AdminUserUpdateRequest req) {

        Optional<User> existing = userRepository.findById(id);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();

        User user = existing.get();
        user.setFirstname(req.getFirstname());
        user.setLastname(req.getLastname());
        user.setEmail(req.getEmail());
        user.setDesignation(req.getDesignation());
        user.setHomeNo(req.getHomeNo());
        user.setStreet(req.getStreet());
        user.setCity(req.getCity());
        user.setDistrict(req.getDistrict());
        user.setAccountHolderName(req.getAccountHolderName());
        user.setAccountNumber(req.getAccountNumber());
        user.setBankName(req.getBankName());
        user.setBranch(req.getBranch());
        user.setPhoneNumbers(req.getPhoneNumbers());
        user.setLanguages(req.getLanguages());

        userRepository.save(user);
        return ResponseEntity.ok("User updated successfully");
    }


    @PutMapping("/users/{id}/delete")
    public ResponseEntity<?> scheduleUserDeletion(@PathVariable Long id) {
        Optional<User> optional = userRepository.findById(id);
        if (optional.isEmpty()) return ResponseEntity.notFound().build();

        User user = optional.get();

        if (user.getRole() == Role.SUPER_ADMIN) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Cannot delete a SUPER_ADMIN account.");
        }

        user.setActive(false);  // deactivate account
        user.setScheduledForDeletion(true);
        user.setDeletionScheduledAt(LocalDateTime.now().plusMonths(1));
        userRepository.save(user);

        return ResponseEntity.ok("User scheduled for deletion in 1 month.");
    }

    @PutMapping("/users/{id}/undo-delete")
    public ResponseEntity<?> undoUserDeletion(@PathVariable Long id) {
        Optional<User> optional = userRepository.findById(id);
        if (optional.isEmpty()) return ResponseEntity.notFound().build();

        User user = optional.get();
        if (!user.isScheduledForDeletion()) {
            return ResponseEntity.badRequest().body("User is not scheduled for deletion.");
        }

        user.setScheduledForDeletion(false);
        user.setDeletionScheduledAt(null);
        user.setActive(true);  // optionally reactivate
        userRepository.save(user);

        return ResponseEntity.ok("User deletion undone and account reactivated.");
    }

    @DeleteMapping("/decline/{id}")
    @PreAuthorize("hasAuthority('SUPER_ADMIN')")
    public ResponseEntity<String> declinePendingUser(@PathVariable Long id) {
        Optional<User> userOpt = userRepository.findById(id);

        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOpt.get();

        // Only allow declining if profile is completed but not approved
        if (user.getRole() == Role.PAPER_SETTER && user.isProfileCompleted() && !user.isActive()) {
            userRepository.delete(user);
            return ResponseEntity.ok("User declined and deleted.");
        }

        return ResponseEntity.badRequest().body("Only pending Paper Setter requests can be declined.");
    }


    @GetMapping("/users/{id}/profile-image")
    @PreAuthorize("hasAuthority('SUPER_ADMIN')")
    public ResponseEntity<byte[]> getUserProfileImageById(@PathVariable Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();

        User user = userOpt.get();
        byte[] image = user.getProfileImage();
        if (image == null || image.length == 0) {
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // Or adjust to PNG if needed
        return new ResponseEntity<>(image, headers, HttpStatus.OK);
    }

 
}
