package com.example.coderella.service;

import com.example.coderella.entity.RecentSubjects;
import com.example.coderella.entity.Subject; // ✅ <-- Required import
import com.example.coderella.repository.RecentSubjectRepository;
import com.example.coderella.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class RecentSubjectService {

    private final SubjectRepository subjectRepo;
    private final RecentSubjectRepository recentRepo;

    public void markAsAccessed(String subjectCode) {
        Subject subject = subjectRepo.findByCode(subjectCode)
                .orElseThrow(() -> new RuntimeException("Subject not found for code: " + subjectCode));

        RecentSubjects rs = recentRepo.findById(subjectCode).orElse(null);

        if (rs == null) {
            // create new
            rs = RecentSubjects.builder()
                    .code(subjectCode)
                    .title(subject.getTitle() != null ? subject.getTitle() : "Untitled")
                    .level(subject.getCourse() != null ? subject.getCourse().getLevel() : "N/A")
                    .courseCode(subject.getCourse() != null ? subject.getCourse().getCode() : "No Course")
                    .coverPath(subject.getCoverPath())
                    .lastAccessed(LocalDateTime.now())
                    .build();
        } else {
            // update existing
            rs.setTitle(subject.getTitle());
            rs.setLevel(subject.getCourse().getLevel());
            rs.setCourseCode(subject.getCourse().getCode());
            rs.setCoverPath(subject.getCoverPath());
            rs.setLastAccessed(LocalDateTime.now());
        }

        recentRepo.save(rs);
    }


    public List<RecentSubjects> getRecentSubjects() {
        return recentRepo.findTop5ByOrderByLastAccessedDesc();
    }
}
