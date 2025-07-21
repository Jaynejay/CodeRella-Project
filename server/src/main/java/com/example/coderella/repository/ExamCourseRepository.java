package com.example.coderella.repository;

import com.example.coderella.entity.ExamCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExamCourseRepository extends JpaRepository<ExamCourse, Long> {
    
    Optional<ExamCourse> findByCode(String code);
    
    @Query("SELECT c FROM Course c WHERE c.name LIKE %:keyword% OR c.code LIKE %:keyword%")
    List<ExamCourse> searchByKeyword(@Param("keyword") String keyword);
} 