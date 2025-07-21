// src/main/java/com/example/coderella/service/CourseService.java
package com.example.coderella.service;

import com.example.coderella.dto.CourseDto;
import com.example.coderella.entity.Course;
import com.example.coderella.repository.CourseRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

@Service
@Transactional
public class CourseService {
    private final CourseRepository repo;

    public CourseService(CourseRepository repo) {
        this.repo = repo;
    }

    public Course createCourse(CourseDto dto) throws IOException {
        // ───── Duplicate Check ─────
        if (repo.findBySNo(dto.getSNo()).isPresent()) {
            throw new IllegalArgumentException("Duplicate entry: Course with sNo " + dto.getSNo() + " already exists.");
        }

        if (repo.findByCode(dto.getCode()).isPresent()) {
            throw new IllegalArgumentException("Duplicate entry: Course with code " + dto.getCode() + " already exists.");
        }


        // ───── Save Course ─────
        Course c = new Course();
        c.setSNo(dto.getSNo());
        c.setCode(dto.getCode());
        c.setTitle(dto.getTitle());
        c.setLevel(dto.getLevel());
        c.setName(dto.getName());

        if (dto.getImage() != null && !dto.getImage().isEmpty()) {
            c.setImageData(dto.getImage().getBytes());
            c.setImageType(dto.getImage().getContentType());
        }

        return repo.save(c);
    }

    public Course updateCourse(Long sNo, CourseDto dto) throws IOException {
        Course c = repo.findBySNo(sNo)
                .orElseThrow(() -> new EntityNotFoundException("Course not found: " + sNo));

        c.setCode(dto.getCode());
        c.setTitle(dto.getTitle());
        c.setLevel(dto.getLevel());

        if (dto.getImage() != null && !dto.getImage().isEmpty()) {
            c.setImageData(dto.getImage().getBytes());
            c.setImageType(dto.getImage().getContentType());
        }

        return repo.save(c);
    }

    @Transactional(readOnly = true)
    public Course getBySNo(Long sNo) {
        return repo.findBySNo(sNo)
                .orElseThrow(() -> new EntityNotFoundException("Course not found: " + sNo));
    }

    public void deleteBySNo(Long sNo) {
        Course c = getBySNo(sNo);
        repo.delete(c);
    }

    @Transactional(readOnly = true)
    public List<Course> listAll() {
        return repo.findAll();
    }

    @Transactional(readOnly = true)
    public List<Course> findRecentCourses() {
        return repo.findTop5ByOrderByCreatedAtDesc();
    }
}
