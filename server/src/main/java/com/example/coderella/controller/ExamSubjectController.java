package com.example.coderella.controller;

import com.example.coderella.entity.ExamSubject;
import com.example.coderella.service.ExamSubjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "*")
public class ExamSubjectController {

    private final ExamSubjectService subjectService;

    public ExamSubjectController(ExamSubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping
    public List<ExamSubject> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExamSubject> getSubjectById(@PathVariable Long id) {
        return subjectService.getSubjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<ExamSubject> getSubjectByCode(@PathVariable String code) {
        return subjectService.getSubjectByCode(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Updated method call here
    @GetMapping("/course/{courseId}")
    public List<ExamSubject> getSubjectsByCourseId(@PathVariable Long courseId) {
        return subjectService.getSubjectsByExamCourseId(courseId);
    }

    @PostMapping
    public ExamSubject createSubject(@RequestBody ExamSubject subject) {
        return subjectService.createSubject(subject);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExamSubject> updateSubject(@PathVariable Long id, @RequestBody ExamSubject subjectDetails) {
        try {
            ExamSubject updatedSubject = subjectService.updateSubject(id, subjectDetails);
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
    public List<ExamSubject> searchSubjects(@RequestParam String keyword) {
        return subjectService.searchSubjects(keyword);
    }

    // Updated method call here
    @GetMapping("/course/{courseId}/search")
    public List<ExamSubject> searchSubjectsByCourse(@PathVariable Long courseId, @RequestParam String keyword) {
        return subjectService.searchSubjectsByExamCourse(courseId, keyword);
    }
}
