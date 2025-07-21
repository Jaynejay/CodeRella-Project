package com.example.coderella.controller;

import com.example.coderella.entity.Exam;
import com.example.coderella.entity.ExamCourse;
import com.example.coderella.service.ExamService;
import com.example.coderella.service.ExamCourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@RequestMapping("/api/exams")
@CrossOrigin(origins = "*")
public class ExamController {

    private final ExamService examService;

    @Autowired
    private ExamCourseService courseService; // Fixed service name

    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable Long id) {
        return examService.getExamById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Exam createExam(@RequestBody Exam exam) {
        return examService.createExam(exam);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exam> updateExam(@PathVariable Long id, @RequestBody Exam examDetails) {
        try {
            Exam updatedExam = examService.updateExam(id, examDetails);
            return ResponseEntity.ok(updatedExam);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable Long id) {
        try {
            examService.deleteExam(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public List<Exam> searchExams(@RequestParam String keyword) {
        return examService.searchExams(keyword);
    }

    // Get courses assigned to an exam
    @GetMapping("/{examId}/courses")
    public List<ExamCourse> getCoursesForExam(@PathVariable Long examId) {
        return examService.getCoursesForExam(examId);
    }

    // Assign courses to an exam (replace all assignments)
    @PostMapping("/{examId}/courses")
    public List<ExamCourse> assignCoursesToExam(@PathVariable Long examId, @RequestBody List<Long> courseIds) {
        return examService.assignCoursesToExam(examId, courseIds);
    }

    // Remove a course from an exam
    @DeleteMapping("/{examId}/courses/{courseId}")
    public void removeCourseFromExam(@PathVariable Long examId, @PathVariable Long courseId) {
        examService.removeCourseFromExam(examId, courseId);
    }
}
