// PaperSetterAnnouncementController.java
package com.example.coderella.controller;
import com.example.coderella.entity.PaperSetterAnnouncement;
import com.example.coderella.service.PaperSetterAnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/papersetter/announcements")
@RequiredArgsConstructor
public class PaperSetterAnnouncementController {
    private final PaperSetterAnnouncementService service;

    @GetMapping
    public List<PaperSetterAnnouncement> getAll(@RequestParam Long paperSetterId) {
        return service.getByPaperSetterId(paperSetterId);
    }

    @GetMapping("/{id}")
    public PaperSetterAnnouncement getOne(@PathVariable Long id) {
        return service.getByPaperSetterId(id).stream()
                .filter(a->a.getId().equals(id)).findFirst().orElse(null);
    }
}

