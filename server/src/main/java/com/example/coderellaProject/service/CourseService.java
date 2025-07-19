package com.example.coderellaProject.service;

import com.example.coderellaProject.dto.CourseDto;
import com.example.coderellaProject.model.Course;
import com.example.coderellaProject.repository.CourseRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.io.IOException;

@Service
@Transactional
public class CourseService {
    private final CourseRepository repo;

    public CourseService(CourseRepository repo) {
        this.repo = repo;
    }

    public Course createCourse(CourseDto dto) throws IOException {
        Course c = new Course();
        c.setSNo(dto.getSNo());
        c.setCode(dto.getCode());
        c.setTitle(dto.getTitle());
        c.setLevel(dto.getLevel());
        if (dto.getImage() != null && !dto.getImage().isEmpty()) {
            c.setImageData(dto.getImage().getBytes());
            c.setImageType(dto.getImage().getContentType());
        }
        return repo.save(c);
    }

    public Course updateCourse(Long id, CourseDto dto) throws IOException {
        Course c = repo.findBySNo(id)
                .orElseThrow(() -> new EntityNotFoundException("Course not found: " + id));
        // If you ever allow changing sNo itself, uncomment next line:
        // c.setSNo(dto.getSNo());
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
        if (!repo.findBySNo(sNo).isPresent()) {
            throw new EntityNotFoundException("Course not found: " + sNo);
        }
        repo.deleteBySNo(sNo);
    }

    @Transactional(readOnly = true)
    public List<Course> listAll() {
        return repo.findAll();
    }
}
