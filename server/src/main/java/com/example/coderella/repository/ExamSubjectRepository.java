package com.example.coderella.repository;

import com.example.coderella.entity.ExamSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamSubjectRepository extends JpaRepository<ExamSubject, Long> {
    
    Optional<ExamSubject> findByCode(String code);
    
    List<ExamSubject> findByCourseId(Long courseId);
    
    @Query("SELECT s FROM ExamSubject s WHERE s.name LIKE %:keyword% OR s.code LIKE %:keyword%")
    List<ExamSubject> searchByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT s FROM ExamSubject s WHERE s.course.id = :courseId AND (s.name LIKE %:keyword% OR s.code LIKE %:keyword%)")
    List<ExamSubject> searchByCourseAndKeyword(@Param("courseId") Long courseId, @Param("keyword") String keyword);
}
