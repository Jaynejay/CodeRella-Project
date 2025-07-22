package com.example.coderella.repository;

import com.example.coderella.entity.SubjectAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectAssignmentRepository extends JpaRepository<SubjectAssignment, Long> {
    List<SubjectAssignment> findBySubjectCode(String subjectCode);
    boolean existsBySubjectCodeAndPaperSetterRegistrationId(String subjectCode, String registrationId);
    void deleteBySubjectCodeAndPaperSetterRegistrationId(String subjectCode, String registrationId);
}
