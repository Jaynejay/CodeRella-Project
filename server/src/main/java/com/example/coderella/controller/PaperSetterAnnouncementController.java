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
    public List<PaperSetterAnnouncement> getAllForPaperSetter(@RequestParam Long paperSetterId) {
        return service.getAnnouncementsByPaperSetterId(paperSetterId);
    }

    @GetMapping("/{id}")
    public PaperSetterAnnouncement getAnnouncement(@PathVariable Long id) {
        return service.getAnnouncementById(id);
    }
}

