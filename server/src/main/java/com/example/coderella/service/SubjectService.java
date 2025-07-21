package com.example.coderella.service;

import com.example.coderella.dto.SubjectDto;
import com.example.coderella.entity.Course;
import com.example.coderella.entity.Subject;
import com.example.coderella.repository.SubjectRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SubjectService {
    private final SubjectRepository subjectRepo;
    private final CourseService courseService;

    public SubjectService(SubjectRepository subjectRepo,
                          CourseService courseService) {
        this.subjectRepo   = subjectRepo;
        this.courseService = courseService;
    }

    public List<Subject> listByCourse(Long sNo) {
        // ensure the course exists
        courseService.getBySNo(sNo);
        return subjectRepo.findByCourse_SNo(sNo);
    }

    public Subject create(Long sNo, SubjectDto dto) {
        Course course = courseService.getBySNo(sNo);
        Subject s = new Subject();
        s.setCode(dto.getCode());
        s.setTitle(dto.getTitle());
        s.setLevel(dto.getLevel());
        s.setCourse(course);
        return subjectRepo.save(s);
    }

    public Subject getByCode(Long sNo, String subjectCode) {
        // ensure the course exists
        courseService.getBySNo(sNo);
        return subjectRepo.findByCourse_SNoAndCode(sNo, subjectCode)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Subject not found: " + subjectCode + " in course " + sNo));
    }

    public Subject update(Long sNo, String subjectCode, SubjectDto dto) {
        Subject s = getByCode(sNo, subjectCode);
        s.setTitle(dto.getTitle());
        s.setLevel(dto.getLevel());
        return subjectRepo.save(s);
    }

    public void delete(Long sNo, String subjectCode) {
        // will throw if not found
        Subject s = getByCode(sNo, subjectCode);
        subjectRepo.delete(s);
    }
}
