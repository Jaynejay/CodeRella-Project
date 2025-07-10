package com.example.coderellaProject.repository;

import com.example.coderellaProject.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    
    Optional<Subject> findByCode(String code);
    
    List<Subject> findByCourseId(Long courseId);
    
    @Query("SELECT s FROM Subject s WHERE s.name LIKE %:keyword% OR s.code LIKE %:keyword%")
    List<Subject> searchByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT s FROM Subject s WHERE s.course.id = :courseId AND (s.name LIKE %:keyword% OR s.code LIKE %:keyword%)")
    List<Subject> searchByCourseAndKeyword(@Param("courseId") Long courseId, @Param("keyword") String keyword);
} 