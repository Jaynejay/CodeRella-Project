package com.example.coderella.repository;

import com.example.coderella.entity.Subject;
import com.example.coderella.entity.SubjectAssignment;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectAssignmentRepository extends JpaRepository<SubjectAssignment, Integer> {

    // ✅ Fetch subjects assigned to a paper setter
    @Query("SELECT sa.subject FROM SubjectAssignment sa WHERE sa.paperSetter.registrationId = :registrationId")
    List<Subject> findSubjectsByRegistrationId(@Param("registrationId") String registrationId);

    // ✅ Get all assignments by subject code
    List<SubjectAssignment> findBySubjectCode(String subjectCode);

    // ✅ Check if a paper setter is assigned to a subject
    boolean existsBySubjectCodeAndPaperSetterRegistrationId(String subjectCode, String registrationId);

    // ✅ Remove assignment by subject + paper setter
    void deleteBySubjectCodeAndPaperSetterRegistrationId(String subjectCode, String registrationId);
}
