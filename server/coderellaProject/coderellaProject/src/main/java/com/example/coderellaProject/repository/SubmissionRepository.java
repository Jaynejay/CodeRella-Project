package com.example.coderellaProject.repository;

import com.example.coderellaProject.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionRepository extends JpaRepository<Submission,Long> {
}
