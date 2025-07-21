package com.example.coderella.service;

import com.example.coderella.entity.ExamSubject;
import com.example.coderella.repository.ExamSubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExamSubjectService {

    private final ExamSubjectRepository examSubjectRepository;

    public ExamSubjectService(ExamSubjectRepository examSubjectRepository) {
        this.examSubjectRepository = examSubjectRepository;
    }

    // Fetch all ExamSubjects
    public List<ExamSubject> getAllSubjects() {
        return examSubjectRepository.findAll();
    }

    // Find ExamSubject by its ID
    public Optional<ExamSubject> getSubjectById(Long id) {
        return examSubjectRepository.findById(id);
    }

    // Find ExamSubject by its unique code
    public Optional<ExamSubject> getSubjectByCode(String code) {
        return examSubjectRepository.findByCode(code);
    }

    // Find ExamSubjects by ExamCourse id
    public List<ExamSubject> getSubjectsByExamCourseId(Long examCourseId) {
        return examSubjectRepository.findByExamCourseId(examCourseId);
    }

    // Create a new ExamSubject
    public ExamSubject createSubject(ExamSubject subject) {
        return examSubjectRepository.save(subject);
    }

    // Update existing ExamSubject by ID
    public ExamSubject updateSubject(Long id, ExamSubject subjectDetails) {
        ExamSubject subject = examSubjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found with id: " + id));

        subject.setCode(subjectDetails.getCode());
        subject.setName(subjectDetails.getName());
        subject.setDescription(subjectDetails.getDescription());
        subject.setExamCourse(subjectDetails.getExamCourse());  // Corrected from setCourse()

        return examSubjectRepository.save(subject);
    }

    // Delete an ExamSubject by ID
    public void deleteSubject(Long id) {
        ExamSubject subject = examSubjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found with id: " + id));
        examSubjectRepository.delete(subject);
    }

    // Search ExamSubjects by keyword (you need to implement this method in the repository)
    public List<ExamSubject> searchSubjects(String keyword) {
        return examSubjectRepository.searchByKeyword(keyword);
    }

    // Search ExamSubjects by ExamCourse and keyword (repository method needed)
    public List<ExamSubject> searchSubjectsByExamCourse(Long examCourseId, String keyword) {
        return examSubjectRepository.searchByExamCourseAndKeyword(examCourseId, keyword);
    }
}
