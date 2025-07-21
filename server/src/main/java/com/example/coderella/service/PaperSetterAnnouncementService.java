// PaperSetterAnnouncementService.java
package com.example.coderella.service;
import com.example.coderella.entity.PaperSetterAnnouncement;
import com.example.coderella.repository.PaperSetterAnnouncementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service @RequiredArgsConstructor
public class PaperSetterAnnouncementService {
    private final PaperSetterAnnouncementRepository repo;
    public PaperSetterAnnouncement createFromManager(String subject,String message,String author,String username) {
        Long psId = /* lookup ID by username */ null;
        var psa = PaperSetterAnnouncement.builder()
                .subject(subject).message(message).author(author)
                .sentAt(LocalDateTime.now()).paperSetterId(psId).build();
        return repo.save(psa);
    }
    public List<PaperSetterAnnouncement> getByPaperSetterId(Long id) {
        return repo.findByPaperSetterId(id);
    }
}
