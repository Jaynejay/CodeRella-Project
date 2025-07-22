package com.example.coderella.service;

import com.example.coderella.entity.PaperSetterAnnouncement;
import com.example.coderella.entity.User;
import com.example.coderella.repository.PaperSetterAnnouncementRepository;
import com.example.coderella.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaperSetterAnnouncementService {

    private final PaperSetterAnnouncementRepository repo;
    private final UserRepository userRepository;

    public PaperSetterAnnouncement createFromManager(String subject, String message, String author, String username) {
        // ✅ Lookup user by username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("No user found with username: " + username));

        Long psId = user.getId();  // Use User ID as the paperSetterId

        // ✅ Build and save PaperSetterAnnouncement
        var psa = PaperSetterAnnouncement.builder()
                .subject(subject)
                .message(message)
                .author(author)
                .sentAt(LocalDateTime.now())
                .paperSetterId(psId)
                .build();

        return repo.save(psa);
    }

    public List<PaperSetterAnnouncement> getByPaperSetterId(Long id) {
        return repo.findByPaperSetterId(id);
    }
}
