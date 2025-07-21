package com.example.coderella.controller;

import com.example.coderella.entity.PaperSetter;
import com.example.coderella.service.PaperSetterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/paper-setters")
@CrossOrigin(origins = "*")
public class PaperSetterController {

    private final PaperSetterService paperSetterService;

    public PaperSetterController(PaperSetterService paperSetterService) {
        this.paperSetterService = paperSetterService;
    }

    @GetMapping
    public List<PaperSetter> getAllPaperSetters() {
        return paperSetterService.getAllPaperSetters();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaperSetter> getPaperSetterById(@PathVariable Long id) {
        return paperSetterService.getPaperSetterById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/registration/{registrationId}")
    public ResponseEntity<PaperSetter> getPaperSetterByRegistrationId(@PathVariable String registrationId) {
        return paperSetterService.getPaperSetterByRegistrationId(registrationId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PaperSetter> createPaperSetter(@RequestBody PaperSetter paperSetter) {
        try {
            PaperSetter createdPaperSetter = paperSetterService.createPaperSetter(paperSetter);
            return ResponseEntity.ok(createdPaperSetter);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaperSetter> updatePaperSetter(@PathVariable Long id, @RequestBody PaperSetter paperSetterDetails) {
        try {
            PaperSetter updatedPaperSetter = paperSetterService.updatePaperSetter(id, paperSetterDetails);
            return ResponseEntity.ok(updatedPaperSetter);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaperSetter(@PathVariable Long id) {
        try {
            paperSetterService.deletePaperSetter(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public List<PaperSetter> searchPaperSetters(@RequestParam String keyword) {
        return paperSetterService.searchPaperSetters(keyword);
    }
} 