package com.example.coderella.repository;

import com.example.coderella.entity.Role;
import com.example.coderella.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);
    User findByUsername(String username);
    long countByRole(Role role);
    boolean existsByEmail(String email);
    List<User> findByRole(Role role);
    Optional<User> findByEmail(String email);
    Optional<User> findByResetToken(String resetToken);

}