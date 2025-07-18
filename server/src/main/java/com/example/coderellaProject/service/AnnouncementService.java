package com.example.coderellaProject.service;

import com.example.coderellaProject.model.Announcement;
import com.example.coderellaProject.repository.AnnouncementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    public AnnouncementService(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    // Save a new announcement
    public Announcement saveAnnouncement(Announcement announcement) {
        return announcementRepository.save(announcement);
    }

    // Retrieve all announcements
    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }

    // Retrieve announcements for a specific recipient username
    public List<Announcement> getAnnouncementsForRecipient(String recipientUsername) {
        return announcementRepository.findByRecipientUsername(recipientUsername);
    }

    // Delete an announcement by ID
    public void deleteAnnouncement(Long id) {
        announcementRepository.deleteById(id);
    }
}
