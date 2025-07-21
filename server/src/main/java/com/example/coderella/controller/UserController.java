package com.example.coderella.controller;

import com.example.coderella.dto.UserProfileRequest;
import com.example.coderella.dto.UserProfileResponse;
import com.example.coderella.entity.User;
import com.example.coderella.repository.UserRepository;
import com.example.coderella.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final ActivityService activityService;

    @PostMapping("/complete-profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> completeProfile(
            @RequestBody UserProfileRequest request,
            Authentication authentication
    ) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);

        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setNic(request.getNic());
        user.setDesignation(request.getDesignation());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setPhoneNumbers(request.getPhoneNumbers());
        user.setLanguages(request.getLanguages());
        user.setHomeNo(request.getHomeNo());
        user.setStreet(request.getStreet());
        user.setCity(request.getCity());
        user.setDistrict(request.getDistrict());
        user.setAccountHolderName(request.getAccountHolderName());
        user.setAccountNumber(request.getAccountNumber());
        user.setBankName(request.getBankName());
        user.setBranch(request.getBranch());

        user.setProfileCompleted(true);

        userRepository.save(user);

        // ✅ Log activity
        activityService.logActivity(username, "PROFILE_COMPLETION", "User submitted profile for admin review.");

        return ResponseEntity.ok("Profile submitted for admin review.");
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getLoggedInUser(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);

        UserProfileResponse response = new UserProfileResponse(
                user.getUsername(),
                user.getEmail(),
                user.getRole().name(),
                user.getFirstname(),
                user.getLastname(),
                user.getNic(),
                user.getDesignation(),
                user.getDateOfBirth(),
                user.getPhoneNumbers(),
                user.getLanguages(),
                user.getHomeNo(),
                user.getStreet(),
                user.getCity(),
                user.getDistrict(),
                user.getAccountHolderName(),
                user.getAccountNumber(),
                user.getBankName(),
                user.getBranch()
        );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/update-profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> updateProfile(
            @RequestBody UserProfileRequest request,
            Authentication authentication
    ) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);

        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setNic(request.getNic());
        user.setDesignation(request.getDesignation());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setPhoneNumbers(request.getPhoneNumbers());
        user.setLanguages(request.getLanguages());
        user.setHomeNo(request.getHomeNo());
        user.setStreet(request.getStreet());
        user.setCity(request.getCity());
        user.setDistrict(request.getDistrict());
        user.setAccountHolderName(request.getAccountHolderName());
        user.setAccountNumber(request.getAccountNumber());
        user.setBankName(request.getBankName());
        user.setBranch(request.getBranch());

        userRepository.save(user);

        // ✅ Log activity
        activityService.logActivity(username, "PROFILE_UPDATE", "User updated profile details.");

        return ResponseEntity.ok("Profile updated successfully.");
    }

    @PostMapping("/upload-profile-image")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> uploadProfileImage(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {

        String username = authentication.getName();
        String uploadDir = "uploads/";
        String fileName = username + ".jpg"; // or use file.getOriginalFilename() if preferred

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.write(filePath, file.getBytes());

            // ✅ Log activity
            activityService.logActivity(username, "UPLOAD_PROFILE_IMAGE", "User uploaded a profile image.");

            return ResponseEntity.ok("Profile image uploaded successfully.");

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload profile image.");
        }
    }

    @GetMapping("/profile-image")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<byte[]> getProfileImage(Authentication authentication) {
        String username = authentication.getName();
        Path path = Paths.get("uploads/" + username + ".jpg");

        if (!Files.exists(path)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 👈 return null body but correct type
        }

        try {
            byte[] image = Files.readAllBytes(path);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            return new ResponseEntity<>(image, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 👈 same fix here
        }
    }






}
