// src/main/java/com/example/coderellaProject/service/UserServiceImpl.java
package com.example.coderella.service;

import com.example.coderella.dto.UserSummaryDto;
import com.example.coderella.entity.User;
import com.example.coderella.repository.UserRepository;
import com.example.coderella.service.UserService;
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
