// src/main/java/com/example/coderellaProject/service/SubjectService.java
package com.example.coderella.service;

import com.example.coderella.dto.SubjectDto;
import com.example.coderella.entity.Course;
import com.example.coderella.entity.Subject;
import com.example.coderella.repository.SubjectRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.List;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class SubjectService {
    private final SubjectRepository subjectRepo;
    private final CourseService courseService;

    public SubjectService(SubjectRepository subjectRepo,
                          CourseService courseService) {
        this.subjectRepo = subjectRepo;
        this.courseService = courseService;
    }

    public List<Subject> listByCourse(Long sNo) {
        Course course = courseService.getBySNo(sNo);
        return subjectRepo.findByCourse_Code(course.getCode()); // still use course code
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

                // ✅ Use your exact folder path
                String uploadDir = "C:/Users/DELL/OneDrive/Desktop/Backend/coderellaProject/uploads/subject_covers/";
                Path uploadPath = Paths.get(uploadDir);

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                    System.out.println("✅ Created directory: " + uploadPath);
                }

                Path filePath = uploadPath.resolve(fileName);
                dto.getImage().transferTo(filePath.toFile());

                s.setCoverPath(fileName); // Save just the filename (not full path)
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
