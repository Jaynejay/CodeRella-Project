package com.example.coderella.repository;

import com.example.coderella.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    // Find all announcements sent to a specific paper setter (by username)
    List<Announcement> findByRecipientUsername(String recipientUsername);
}
