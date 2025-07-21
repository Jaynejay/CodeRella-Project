// AnnouncementRepository.java
package com.example.coderella.repository;
import com.example.coderella.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {}