package com.example.coderellaProject.repository;

import com.example.coderellaProject.model.PaperSetterAnnouncement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaperSetterAnnouncementRepository extends JpaRepository<PaperSetterAnnouncement, Long> {
    List<PaperSetterAnnouncement> findByPaperSetterId(Long paperSetterId);
}
