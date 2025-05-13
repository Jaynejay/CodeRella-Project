package com.example.coderellaProject.controller;

import com.example.coderellaProject.model.Exam;
import com.example.coderellaProject.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@CrossOrigin(origins = "*")
public class ExamController {

    private final ExamRepository examRepository;

    public ExamController(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }
    //Get all exams
    @GetMapping
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    // Get exam by ID
    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable Long id) {
        return examRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //create new course
    @PostMapping
    public Exam addExam(@RequestBody Exam exam) {
        return examRepository.save(exam);
    }

    //Delete exam
    @DeleteMapping("/{id}")
    public void deleteExam(@PathVariable Long id) {
        examRepository.deleteById(id);
    }
}