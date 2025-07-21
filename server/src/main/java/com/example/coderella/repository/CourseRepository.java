// src/main/java/com/example/coderellaProject/repository/CourseRepository.java
package com.example.coderella.repository;

import com.example.coderella.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    // Explicitly bind to the sNo field, avoiding Spring Data’s parser
    @Query("SELECT c FROM Course c WHERE c.sNo = :sNo")
    Optional<Course> findBySNo(@Param("sNo") Long sNo);

    // For “recent courses” if you need it
    List<Course> findTop5ByOrderByCreatedAtDesc();

    Optional<Object> findByCode(String code);
}
