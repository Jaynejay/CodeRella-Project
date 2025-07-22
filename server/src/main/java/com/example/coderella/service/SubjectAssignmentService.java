package com.example.coderella.service;

import com.example.coderella.entity.SubjectAssignment;
import com.example.coderella.repository.SubjectAssignmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectAssignmentService {

    private final SubjectAssignmentRepository assignmentRepo;

    public void assignPaperSetter(String subjectCode, String registrationId) {
        if (!assignmentRepo.existsBySubjectCodeAndPaperSetterRegistrationId(subjectCode, registrationId)) {
            SubjectAssignment sa = new SubjectAssignment();
            sa.setSubjectCode(subjectCode);
            sa.setPaperSetterRegistrationId(registrationId);
            assignmentRepo.save(sa);
        }
    }

    public void cancelAssignment(String subjectCode, String registrationId) {
        assignmentRepo.deleteBySubjectCodeAndPaperSetterRegistrationId(subjectCode, registrationId);
    }

    public List<SubjectAssignment> getAssignmentsForSubject(String subjectCode) {
        return assignmentRepo.findBySubjectCode(subjectCode);
    }
}
