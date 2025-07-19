// src/main/java/com/example/coderellaProject/repository/CourseRepository.java
package com.example.coderellaProject.repository;

import com.example.coderellaProject.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<Course> findBySNo(Long sNo);
    void deleteBySNo(Long sNo);
}


