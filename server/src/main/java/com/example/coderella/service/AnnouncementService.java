// AnnouncementService.java
package com.example.coderella.service;

import com.example.coderella.entity.Announcement;
import com.example.coderella.repository.AnnouncementRepository;
import com.example.coderella.dto.AnnouncementDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnnouncementService {
    private final AnnouncementRepository repo;
    private final PaperSetterAnnouncementService psaService;

    public Announcement save(AnnouncementDto dto) {
        // Use no-arg constructor then setters to avoid missing multi-arg constructor
        Announcement ann = new Announcement();
        ann.setAuthor(dto.getAuthor());
        ann.setTitle(dto.getTitle());
        ann.setMessage(dto.getMessage());
        ann.setDate(LocalDate.now());

        Announcement saved = repo.save(ann);

        // Propagate to paper-setter announcements
        dto.getRecipientUsernames().forEach(username ->
                psaService.createFromManager(
                        saved.getTitle(), saved.getMessage(), saved.getAuthor(), username
                )
        );

        return saved;
    }

    public List<Announcement> listAll() {
        return repo.findAll();
    }
}
