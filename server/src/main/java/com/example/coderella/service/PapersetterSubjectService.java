// File: src/main/java/com/example/coderellaProject/service/PapersetterSubjectService.java
package com.example.coderella.service;

import com.example.coderella.entity.PapersetterSubject;
import com.example.coderella.repository.PapersetterSubjectRepository;
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
