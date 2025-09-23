// AnnouncementController.java
package com.example.coderella.controller;
import com.example.coderella.dto.AnnouncementDto;
import com.example.coderella.entity.Announcement;
import com.example.coderella.service.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/announcements")
@CrossOrigin(origins="http://localhost:5173")
@RequiredArgsConstructor
public class AnnouncementController {
    private final AnnouncementService service;

    @PostMapping
    public ResponseEntity<Announcement> create(@RequestBody AnnouncementDto dto) {
        var saved = service.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public List<Announcement> listAll() {
        return service.listAll();
    }
}