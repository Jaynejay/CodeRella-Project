package com.example.coderella.controller;

import com.example.coderella.dto.SubjectDto;
import com.example.coderella.entity.Subject;
import com.example.coderella.service.SubjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses/{sNo}/subjects")
@CrossOrigin(origins = "http://localhost:5173")
public class SubjectController {

    private final SubjectService service;
    public SubjectController(SubjectService service) {
        this.service = service;
    }

    @GetMapping
    public List<Subject> listByCourse(@PathVariable Long sNo) {
        return service.listByCourse(sNo);
    }

    @PostMapping
    public ResponseEntity<Subject> create(
            @PathVariable Long sNo,
            @RequestBody SubjectDto dto
    ) {
        Subject created = service.create(sNo, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{subjectCode}")
    public ResponseEntity<Subject> getOne(
            @PathVariable Long sNo,
            @PathVariable String subjectCode
    ) {
        return ResponseEntity.ok(service.getByCode(sNo, subjectCode));
    }

    @PutMapping("/{subjectCode}")
    public ResponseEntity<Subject> update(
            @PathVariable Long sNo,
            @PathVariable String subjectCode,
            @RequestBody SubjectDto dto
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
