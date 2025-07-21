// src/main/java/com/example/coderellaProject/controller/CourseController.java
package com.example.coderella.controller;

import com.example.coderella.dto.CourseDto;
import com.example.coderella.entity.Course;
import com.example.coderella.service.CourseService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CourseController {
    private final CourseService service;

    public CourseController(CourseService service) {
        this.service = service;
    }

    @GetMapping
    public List<Course> listAll() {
        return service.listAll();
    }

    @GetMapping("/recent")
    public List<Course> recent() {
        return service.findRecentCourses();
    }

    @GetMapping("/{sNo}")
    public ResponseEntity<Course> getOne(@PathVariable Long sNo) {
        try {
            return ResponseEntity.ok(service.getBySNo(sNo));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Course> create(@ModelAttribute CourseDto dto) throws IOException {
        Course created = service.createCourse(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{sNo}")
    public ResponseEntity<Course> update(
            @PathVariable Long sNo,
            @ModelAttribute CourseDto dto
    ) throws IOException {
        try {
            Course updated = service.updateCourse(sNo, dto);
            return ResponseEntity.ok(updated);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{sNo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long sNo) {
        service.deleteBySNo(sNo);
    }
}
