package com.example.coderella.controller;

import com.example.coderella.entity.Activity;
import com.example.coderella.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @GetMapping
    @PreAuthorize("hasAuthority('SUPER_ADMIN')")
    public List<Activity> getAllActivities() {
        return activityService.getAllActivities();
    }

    @GetMapping("/{username}")
    @PreAuthorize("hasAuthority('SUPER_ADMIN')")
    public List<Activity> getActivitiesByUsername(@PathVariable String username) {
        return activityService.getActivitiesByUsername(username);
    }
}
