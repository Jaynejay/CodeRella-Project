// File: src/main/java/com/example/coderella/controller/SubjectController.java
package com.example.coderella.controller;

import com.example.coderella.dto.SubjectDto;
import com.example.coderella.entity.Subject;
import com.example.coderella.service.SubjectService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5174") // or * for all
public class SubjectController {

    private final SubjectService service;

    public SubjectController(SubjectService service) {
        this.service = service;
    }

    // ========== SUBJECTS BY COURSE ==========
    @GetMapping("/api/courses/{sNo}/subjects")
    public List<Subject> listByCourse(@PathVariable Long sNo) {
        return service.listByCourse(sNo);
    }

    @PostMapping(value = "/api/courses/{sNo}/subjects", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Subject> create(
            @PathVariable Long sNo,
            @ModelAttribute SubjectDto dto
    ) {
        try {
            Subject created = service.create(sNo, dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/api/courses/{sNo}/subjects/{subjectCode}")
    public ResponseEntity<Subject> getOne(
            @PathVariable Long sNo,
            @PathVariable String subjectCode
    ) {
        return ResponseEntity.ok(service.getOne(sNo, subjectCode));
    }

    @PutMapping(value = "/api/courses/{sNo}/subjects/{subjectCode}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Subject> update(
            @PathVariable Long sNo,
            @PathVariable String subjectCode,
            @ModelAttribute SubjectDto dto
    ) {
        return ResponseEntity.ok(service.update(sNo, subjectCode, dto));
    }

    @DeleteMapping("/api/courses/{sNo}/subjects/{subjectCode}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
            @PathVariable Long sNo,
            @PathVariable String subjectCode
    ) {
        service.delete(sNo, subjectCode);
    }

    // ========== SUBJECTS BY PAPER SETTER ==========
    @GetMapping("/api/subjects/assigned-to/{registrationId}")
    public ResponseEntity<List<Subject>> getSubjectsAssignedToPaperSetter(@PathVariable String registrationId) {
        return ResponseEntity.ok(service.getSubjectsByPaperSetter(registrationId));
    }
}
