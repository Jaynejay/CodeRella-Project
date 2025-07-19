// File: src/main/java/com/example/coderellaProject/service/PapersetterSubjectService.java
package com.example.coderellaProject.service;

import com.example.coderellaProject.model.PapersetterSubject;
import com.example.coderellaProject.repository.PapersetterSubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PapersetterSubjectService {

    @Autowired
    private PapersetterSubjectRepository repository;

    public List<PapersetterSubject> getSubjectsByRegistrationId(String registrationId) {
        return repository.findByRegistrationId(registrationId);
    }
}
