package com.example.coderella.controller;

import com.example.coderella.entity.RecentSubjects;
import com.example.coderella.service.RecentSubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recent-subjects")
@RequiredArgsConstructor
public class RecentSubjectController {

    private final RecentSubjectService service;

    @PostMapping("/{subjectCode}")
    public ResponseEntity<Void> markSubjectAccessed(@PathVariable String subjectCode) {
        service.markAsAccessed(subjectCode);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<RecentSubjects>> getRecentSubjects() {
        return ResponseEntity.ok(service.getRecentSubjects());
    }
}
