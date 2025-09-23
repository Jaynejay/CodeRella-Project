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
        User user = userRepository.findByUsername(username).orElse(null);// I corected here by .orElse(null);;

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
        User user = userRepository.findByUsername(username).orElse(null);// I corected here by .orElse(null);;// I corrected here by .orElse(null);;

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
        User user = userRepository.findByUsername(username).orElse(null);// I corected here by .orElse(null);;

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
        try {
            String username = authentication.getName();
            User user = userRepository.findByUsername(username).orElse(null);// I corected here by .orElse(null);

            user.setProfileImage(file.getBytes());
            userRepository.save(user);

            activityService.logActivity(username, "UPLOAD_PROFILE_IMAGE", "User uploaded a profile image.");
            return ResponseEntity.ok("Profile image uploaded to database successfully.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload profile image to DB.");
        }
    }


    @GetMapping("/profile-image")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<byte[]> getProfileImage(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElse(null);// I corected here by .orElse(null);

        byte[] image = user.getProfileImage();
        if (image == null || image.length == 0) {
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // Or PNG based on your usage
        return new ResponseEntity<>(image, headers, HttpStatus.OK);
    }






}