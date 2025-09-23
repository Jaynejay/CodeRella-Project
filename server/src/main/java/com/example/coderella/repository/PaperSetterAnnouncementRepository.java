// PaperSetterAnnouncementRepository.java
package com.example.coderella.repository;
import com.example.coderella.entity.PaperSetterAnnouncement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaperSetterAnnouncementRepository extends JpaRepository<PaperSetterAnnouncement, Long> {
    List<PaperSetterAnnouncement> findByPaperSetterId(Long id);
}