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

    public List<ExamSubject> getAllSubjects() {
        return examSubjectRepository.findAll();
    }

    public Optional<ExamSubject> getSubjectById(Long id) {
        return examSubjectRepository.findById(id);
    }

    public Optional<ExamSubject> getSubjectByCode(String code) {
        return examSubjectRepository.findByCode(code);
    }

    public List<ExamSubject> getSubjectsByCourseId(Long courseId) {
        return examSubjectRepository.findByCourseId(courseId);
    }

    public ExamSubject createSubject(ExamSubject subject) {
        return examSubjectRepository.save(subject);
    }

    public ExamSubject updateSubject(Long id, ExamSubject subjectDetails) {
        ExamSubject subject = examSubjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found with id: " + id));

        subject.setCode(subjectDetails.getCode());
        subject.setName(subjectDetails.getName());
        subject.setDescription(subjectDetails.getDescription());
        subject.setCourse(subjectDetails.getCourse());

        return examSubjectRepository.save(subject);
    }

    public void deleteSubject(Long id) {
        ExamSubject subject = examSubjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found with id: " + id));
        examSubjectRepository.delete(subject);
    }

    public List<ExamSubject> searchSubjects(String keyword) {
        return examSubjectRepository.searchByKeyword(keyword);
    }

    public List<ExamSubject> searchSubjectsByCourse(Long courseId, String keyword) {
        return examSubjectRepository.searchByCourseAndKeyword(courseId, keyword);
    }
}
