package com.example.coderella.repository;

import com.example.coderella.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByUsernameOrderByTimestampDesc(String username);
}
