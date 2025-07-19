package com.example.coderellaProject.repository;

import com.example.coderellaProject.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByUsernameOrderByTimestampDesc(String username);
}
