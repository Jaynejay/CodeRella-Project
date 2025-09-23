package com.example.coderella.service;

import com.example.coderella.entity.PaperSetter;
import com.example.coderella.entity.Subject;
import com.example.coderella.entity.SubjectAssignment;
import com.example.coderella.repository.PaperSetterRepository;
import com.example.coderella.repository.SubjectAssignmentRepository;
import com.example.coderella.repository.SubjectRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectAssignmentService {

    private final SubjectAssignmentRepository assignmentRepo;
    private final SubjectRepository subjectRepo;
    private final PaperSetterRepository paperSetterRepo;

    @Transactional
    public void assignPaperSetter(String subjectCode, String registrationId) {
        if (!assignmentRepo.existsBySubjectCodeAndPaperSetterRegistrationId(subjectCode, registrationId)) {

            Subject subject = subjectRepo.findByCode(subjectCode)
                    .orElseThrow(() -> new EntityNotFoundException("Subject not found: " + subjectCode));

            PaperSetter paperSetter = paperSetterRepo.findByRegistrationId(registrationId)
                    .orElseThrow(() -> new EntityNotFoundException("Paper setter not found: " + registrationId));

            SubjectAssignment sa = new SubjectAssignment();
            sa.setSubject(subject);
            sa.setPaperSetter(paperSetter);
            assignmentRepo.save(sa);
        }
    }

    @Transactional  // ✅ Fix for delete error
    public void cancelAssignment(String subjectCode, String registrationId) {
        assignmentRepo.deleteBySubjectCodeAndPaperSetterRegistrationId(subjectCode, registrationId);
    }

    @Transactional(readOnly = true)
    public List<SubjectAssignment> getAssignmentsForSubject(String subjectCode) {
        return assignmentRepo.findBySubjectCode(subjectCode);
    }
}
