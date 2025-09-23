package com.example.coderella.repository;

import com.example.coderella.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subject, String> {
    // list all for a course (unchanged)
    List<Subject> findByCourse_Code(String courseCode);

    // lookup one by its code under that course
    Optional<Subject> findByCourse_CodeAndCode(String courseCode, String code);

    // delete by course+code
    void deleteByCourse_CodeAndCode(String courseCode, String code);

    // optional exists check
    boolean existsByCourse_CodeAndCode(String courseCode, String code);

    // ✅ FIXED
    Optional<Subject> findByCode(String subjectCode);
}
