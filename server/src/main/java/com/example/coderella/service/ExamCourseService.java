package com.example.coderella.service;

import com.example.coderella.entity.ExamCourse;
import com.example.coderella.repository.ExamCourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExamCourseService {

    private final ExamCourseRepository courseRepository;

    public ExamCourseService(ExamCourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<ExamCourse> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<ExamCourse> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public Optional<ExamCourse> getCourseByCode(String code) {
        return courseRepository.findByCode(code);
    }

    public ExamCourse createCourse(ExamCourse course) {
        return courseRepository.save(course);
    }

    public ExamCourse updateCourse(Long id, ExamCourse courseDetails) {
        ExamCourse course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));

        course.setCode(courseDetails.getCode());
        course.setName(courseDetails.getName());
        course.setDescription(courseDetails.getDescription());

        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        ExamCourse course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
        courseRepository.delete(course);
    }

    public List<ExamCourse> searchCourses(String keyword) {
        return courseRepository.searchByKeyword(keyword);
    }
}
