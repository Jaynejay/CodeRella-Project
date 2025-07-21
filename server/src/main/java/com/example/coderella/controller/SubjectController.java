// src/main/java/com/example/coderellaProject/controller/SubjectController.java
package com.example.coderella.controller;

import com.example.coderella.dto.SubjectDto;
import com.example.coderella.entity.Subject;
import com.example.coderella.service.SubjectService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/courses/{sNo}/subjects") // updated to reflect sNo
@CrossOrigin(origins = "http://localhost:5173")
public class SubjectController {

    private final SubjectService service;

    public SubjectController(SubjectService service) {
        this.service = service;
    }

    @GetMapping
    public List<Subject> list(@PathVariable Long sNo) {
        return service.listByCourse(sNo);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Subject> create(
            @PathVariable Long sNo,
            @ModelAttribute SubjectDto dto
    ) {
        try {
            Subject created = service.create(sNo, dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            e.printStackTrace(); // <- LOG the error in console
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/{subjectCode}")
    public ResponseEntity<Subject> getOne(
            @PathVariable Long sNo,
            @PathVariable String subjectCode
    ) {
        return ResponseEntity.ok(service.getOne(sNo, subjectCode));
    }

    @PutMapping(value = "/{subjectCode}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Subject> update(
            @PathVariable Long sNo,
            @PathVariable String subjectCode,
            @ModelAttribute SubjectDto dto
    ) {
        return ResponseEntity.ok(service.update(sNo, subjectCode, dto));
    }

    @DeleteMapping("/{subjectCode}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
            @PathVariable Long sNo,
            @PathVariable String subjectCode
    ) {
        service.delete(sNo, subjectCode);
    }
}
