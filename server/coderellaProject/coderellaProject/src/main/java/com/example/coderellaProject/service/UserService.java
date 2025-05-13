package com.example.coderellaProject.service;

import com.example.coderellaProject.model.Submission;
import com.example.coderellaProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Submission save(Submission submission) {
        return userRepository.save(submission);
    }
}
