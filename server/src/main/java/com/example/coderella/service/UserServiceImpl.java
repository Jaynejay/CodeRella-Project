// src/main/java/com/example/coderellaProject/service/UserServiceImpl.java
package com.example.coderellaProject.service;

import com.example.coderellaProject.dto.UserSummaryDto;
import com.example.coderellaProject.model.User;
import com.example.coderellaProject.repository.UserRepository;
import com.example.coderellaProject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<UserSummaryDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> UserSummaryDto.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .firstname(user.getFirstname())
                        .lastname(user.getLastname())
                        .email(user.getEmail())
                        .role(user.getRole().name()) // assuming Enum
                        .isActive(user.isActive())
                        .build()
                )
                .toList();
    }
}
