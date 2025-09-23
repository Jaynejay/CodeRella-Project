package com.example.coderella.service;

import com.example.coderella.dto.SubjectDto;
import com.example.coderella.entity.Course;
import com.example.coderella.entity.Subject;
import com.example.coderella.repository.SubjectAssignmentRepository;
import com.example.coderella.repository.PaperSetterRepository;
import com.example.coderella.repository.SubjectRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class SubjectService {
    private final SubjectRepository subjectRepo;
    private final CourseService courseService;
    private final PaperSetterRepository paperSetterRepo;
    private final SubjectAssignmentRepository subjectAssignmentRepo;

    public SubjectService(
            SubjectRepository subjectRepo,
            CourseService courseService,
            PaperSetterRepository paperSetterRepo,
            SubjectAssignmentRepository subjectAssignmentRepo
    ) {
        this.subjectRepo = subjectRepo;
        this.courseService = courseService;
        this.paperSetterRepo = paperSetterRepo;
        this.subjectAssignmentRepo = subjectAssignmentRepo;
    }

    public List<Subject> listByCourse(Long sNo) {
        Course course = courseService.getBySNo(sNo);
        return subjectRepo.findByCourse_Code(course.getCode());
    }

    public List<Subject> getSubjectsByPaperSetter(String registrationId) {
        if (!paperSetterRepo.existsByRegistrationId(registrationId)) {
            throw new EntityNotFoundException("Paper setter not found: " + registrationId);
        }

        return subjectAssignmentRepo.findSubjectsByRegistrationId(registrationId);
    }

    public Subject create(Long sNo, SubjectDto dto) {
        Course course = courseService.getBySNo(sNo);
        System.out.println("✅ Found course: " + course.getTitle());

        Subject s = new Subject();
        s.setCode(dto.getCode());
        s.setTitle(dto.getTitle());
        s.setCourse(course);

        if (dto.getImage() != null && !dto.getImage().isEmpty()) {
            try {
                String fileName = System.currentTimeMillis() + "_" + dto.getImage().getOriginalFilename();

                String uploadDir = "C:/Users/DELL/OneDrive/Desktop/New/new/CodeRella-Project/server/uploads/subject_covers/";
                Path uploadPath = Paths.get(uploadDir);

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                    System.out.println("✅ Created directory: " + uploadPath);
                }

                Path filePath = uploadPath.resolve(fileName);
                dto.getImage().transferTo(filePath.toFile());

                s.setCoverPath(fileName);
                System.out.println("✅ Saved image to: " + filePath);
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("Failed to store image file");
            }
        }

        return subjectRepo.save(s);
    }

    public Subject getOne(Long sNo, String subjectCode) {
        Course course = courseService.getBySNo(sNo);
        return subjectRepo.findByCourse_CodeAndCode(course.getCode(), subjectCode)
                .orElseThrow(() -> new EntityNotFoundException("Subject not found"));
    }

    public Subject update(Long sNo, String subjectCode, SubjectDto dto) {
        Subject s = getOne(sNo, subjectCode);
        s.setTitle(dto.getTitle());
        return subjectRepo.save(s);
    }

    public void delete(Long sNo, String subjectCode) {
        Course course = courseService.getBySNo(sNo);
        if (!subjectRepo.existsByCourse_CodeAndCode(course.getCode(), subjectCode)) {
            throw new EntityNotFoundException("Subject not found");
        }
        subjectRepo.deleteByCourse_CodeAndCode(course.getCode(), subjectCode);
    }
}
