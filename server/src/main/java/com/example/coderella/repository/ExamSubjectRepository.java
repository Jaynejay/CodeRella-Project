package com.example.coderella.repository;

import com.example.coderella.entity.ExamSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ExamSubjectRepository extends JpaRepository<ExamSubject, Long> {

    Optional<ExamSubject> findByCode(String code);

    List<ExamSubject> findByExamCourseId(Long examCourseId);

    // Example search method by keyword (implement your own JPQL or native query)
    @Query("SELECT s FROM ExamSubject s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(s.code) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<ExamSubject> searchByKeyword(@Param("keyword") String keyword);

    // Search by examCourse id and keyword
    @Query("SELECT s FROM ExamSubject s WHERE s.examCourse.id = :examCourseId AND (LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(s.code) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<ExamSubject> searchByExamCourseAndKeyword(@Param("examCourseId") Long examCourseId, @Param("keyword") String keyword);
}
