package com.example.coderellaProject.service;
import com.example.coderellaProject.model.Exam;
import com.example.coderellaProject.repository.ExamRepository;
import com.example.coderellaProject.model.Course;
import com.example.coderellaProject.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExamService {
    private final ExamRepository examRepository;
    @Autowired
    private CourseRepository courseRepository;

    public ExamService(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public Optional<Exam> getExamById(Long id) {
        return examRepository.findById(id);
    }

    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    public Exam updateExam(Long id, Exam examDetails) {
        return examRepository.findById(id)
            .map(exam -> {
                exam.setTitle(examDetails.getTitle());
                exam.setCode(examDetails.getCode());
                exam.setYear(examDetails.getYear());
                exam.setImageUrl(examDetails.getImageUrl());
                return examRepository.save(exam);
            })
            .orElseThrow(() -> new RuntimeException("Exam not found with id: " + id));
    }

    public void deleteExam(Long id) {
        examRepository.deleteById(id);
    }

    public List<Exam> searchExams(String keyword) {
        return examRepository.searchExams(keyword);
    }

    public List<Course> getCoursesForExam(Long examId) {
        Optional<Exam> examOpt = examRepository.findById(examId);
        return examOpt.map(Exam::getCourses).orElse(List.of());
    }

    public List<Course> assignCoursesToExam(Long examId, List<Long> courseIds) {
        Exam exam = examRepository.findById(examId)
            .orElseThrow(() -> new RuntimeException("Exam not found with id: " + examId));
        List<Course> courses = courseRepository.findAllById(courseIds);
        exam.setCourses(courses);
        examRepository.save(exam);
        return courses;
    }

    public void removeCourseFromExam(Long examId, Long courseId) {
        Exam exam = examRepository.findById(examId)
            .orElseThrow(() -> new RuntimeException("Exam not found with id: " + examId));
        List<Course> courses = exam.getCourses().stream()
            .filter(c -> !c.getId().equals(courseId))
            .collect(Collectors.toList());
        exam.setCourses(courses);
        examRepository.save(exam);
    }
}
