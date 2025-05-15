package com.example.coderellaProject.repository;

import com.example.coderellaProject.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findByYear(Integer year);
    
    @Query("SELECT e FROM Exam e WHERE e.title LIKE %:keyword% OR e.code LIKE %:keyword%")
    List<Exam> searchExams(String keyword);
}
