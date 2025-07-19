package com.example.coderellaProject.service;

import com.example.coderellaProject.model.Submission;
import com.example.coderellaProject.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserService {
    @Autowired
    private SubmissionRepository submissionRepository;

    public Submission save(Submission submission) {
        return submissionRepository.save(submission);
    }
}
