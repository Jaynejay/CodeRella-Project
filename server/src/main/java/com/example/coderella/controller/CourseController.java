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
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    private final CourseService service;

    public CourseController(CourseService service) {
        this.service = service;
    }

    @GetMapping
    public List<Course> list() {
        return service.listAll();
    }

    @GetMapping("/{sNo}")
    public ResponseEntity<Course> getOne(@PathVariable Long sNo) {
        Course c = service.getBySNo(sNo);
        return ResponseEntity.ok(c);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Course> create(@ModelAttribute CourseDto dto) throws IOException {
        Course saved = service.createCourse(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Course> update(
            @PathVariable Long id,
            @ModelAttribute CourseDto dto) throws IOException {
        Course updated = service.updateCourse(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{sNo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long sNo) {
        service.deleteBySNo(sNo);
    }

    @GetMapping(path = "/{sNo}/image", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<byte[]> image(@PathVariable Long sNo) {
        Course c = service.getBySNo(sNo);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, c.getImageType())
                .body(c.getImageData());
    }
}
