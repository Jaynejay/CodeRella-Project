package com.example.coderellaProject.service;

import com.example.coderellaProject.model.PaperSetterAnnouncement;
import com.example.coderellaProject.repository.PaperSetterAnnouncementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaperSetterAnnouncementService {
    private final PaperSetterAnnouncementRepository repository;

    public List<PaperSetterAnnouncement> getAnnouncementsByPaperSetterId(Long id) {
        return repository.findByPaperSetterId(id);
    }

    public PaperSetterAnnouncement getAnnouncementById(Long id) {
        return repository.findById(id).orElse(null);
    }
}
