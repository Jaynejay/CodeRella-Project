package com.example.coderella.controller;

import com.example.coderella.entity.SubjectAssignment;
import com.example.coderella.service.SubjectAssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/subject-assignments")
@RequiredArgsConstructor
public class SubjectAssignmentController {

    private final SubjectAssignmentService assignmentService;

    @PostMapping("/assign")
    public ResponseEntity<?> assign(@RequestBody Map<String, String> payload) {
        assignmentService.assignPaperSetter(payload.get("subjectCode"), payload.get("registrationId"));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/cancel")
    public ResponseEntity<?> cancel(@RequestBody Map<String, String> payload) {
        assignmentService.cancelAssignment(payload.get("subjectCode"), payload.get("registrationId"));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{subjectCode}")
    public ResponseEntity<List<String>> getAssignments(@PathVariable String subjectCode) {
        List<String> assignedIds = assignmentService.getAssignmentsForSubject(subjectCode)
                .stream().map(SubjectAssignment::getPaperSetterRegistrationId).toList();
        return ResponseEntity.ok(assignedIds);
    }
}
