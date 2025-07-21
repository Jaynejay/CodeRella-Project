package com.example.coderella.service;

import com.example.coderella.entity.Submission;
import com.example.coderella.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ExamUserService {
    @Autowired
    private SubmissionRepository submissionRepository;

    public Submission save(Submission submission) {
        return submissionRepository.save(submission);
    }
}
