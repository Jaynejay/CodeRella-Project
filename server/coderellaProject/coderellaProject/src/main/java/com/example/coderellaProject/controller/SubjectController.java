package com.example.coderellaProject.controller;

import com.example.coderellaProject.model.Subject;
import com.example.coderellaProject.service.SubjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "*")
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping
    public List<Subject> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subject> getSubjectById(@PathVariable Long id) {
        return subjectService.getSubjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<Subject> getSubjectByCode(@PathVariable String code) {
        return subjectService.getSubjectByCode(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/course/{courseId}")
    public List<Subject> getSubjectsByCourseId(@PathVariable Long courseId) {
        return subjectService.getSubjectsByCourseId(courseId);
    }

    @PostMapping
    public Subject createSubject(@RequestBody Subject subject) {
        return subjectService.createSubject(subject);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subject> updateSubject(@PathVariable Long id, @RequestBody Subject subjectDetails) {
        try {
            Subject updatedSubject = subjectService.updateSubject(id, subjectDetails);
            return ResponseEntity.ok(updatedSubject);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long id) {
        try {
            subjectService.deleteSubject(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public List<Subject> searchSubjects(@RequestParam String keyword) {
        return subjectService.searchSubjects(keyword);
    }

    @GetMapping("/course/{courseId}/search")
    public List<Subject> searchSubjectsByCourse(@PathVariable Long courseId, @RequestParam String keyword) {
        return subjectService.searchSubjectsByCourse(courseId, keyword);
    }
} 