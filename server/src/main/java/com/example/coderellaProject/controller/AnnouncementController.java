package com.example.coderellaProject.controller;

import com.example.coderellaProject.model.Announcement;
import com.example.coderellaProject.service.AnnouncementService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/announcements")
@CrossOrigin(origins = "http://localhost:5173") // adjust if your frontend port is different
public class AnnouncementController {

    private final AnnouncementService announcementService;

    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    // POST /api/announcements → Create a new announcement
    @PostMapping
    public Announcement createAnnouncement(@RequestBody Announcement announcement) {
        announcement.setDate(LocalDate.now()); // auto-set current date
        return announcementService.saveAnnouncement(announcement);
    }

    // GET /api/announcements → Get all announcements
    @GetMapping
    public List<Announcement> getAllAnnouncements() {
        return announcementService.getAllAnnouncements();
    }

    // GET /api/announcements/user/{username} → Get announcements for a specific paper setter
    @GetMapping("/user/{username}")
    public List<Announcement> getAnnouncementsByRecipient(@PathVariable String username) {
        return announcementService.getAnnouncementsForRecipient(username);
    }

    // DELETE /api/announcements/{id} → Delete announcement by ID
    @DeleteMapping("/{id}")
    public void deleteAnnouncement(@PathVariable Long id) {
        announcementService.deleteAnnouncement(id);
    }
}

