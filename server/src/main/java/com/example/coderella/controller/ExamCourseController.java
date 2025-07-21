package com.example.coderella.controller;

import com.example.coderella.entity.ExamCourse;
import com.example.coderella.service.ExamCourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class ExamCourseController {

    private final ExamCourseService courseService;

    public ExamCourseController(ExamCourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public List<ExamCourse> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExamCourse> getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<ExamCourse> getCourseByCode(@PathVariable String code) {
        return courseService.getCourseByCode(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ExamCourse createCourse(@RequestBody ExamCourse course) {
        return courseService.createCourse(course);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExamCourse> updateCourse(@PathVariable Long id, @RequestBody ExamCourse courseDetails) {
        try {
            ExamCourse updatedCourse = courseService.updateCourse(id, courseDetails);
            return ResponseEntity.ok(updatedCourse);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        try {
            courseService.deleteCourse(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public List<ExamCourse> searchCourses(@RequestParam String keyword) {
        return courseService.searchCourses(keyword);
    }
}
