package com.example.coderellaProject.service;

import com.example.coderellaProject.model.Activity;
import com.example.coderellaProject.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository repository;

    public void logActivity(String username, String action, String details) {
        Activity activity = Activity.builder()
                .username(username)
                .action(action)
                .details(details)
                .timestamp(LocalDateTime.now())
                .build();
        repository.save(activity);
    }

    public List<Activity> getAllActivities() {
        return repository.findAll();
    }

    public List<Activity> getActivitiesByUsername(String username) {
        return repository.findByUsernameOrderByTimestampDesc(username);
    }
}
