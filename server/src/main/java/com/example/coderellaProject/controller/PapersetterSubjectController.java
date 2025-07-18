// File: src/main/java/com/example/coderellaProject/controller/PapersetterSubjectController.java
package com.example.coderellaProject.controller;

import com.example.coderellaProject.model.PapersetterSubject;
import com.example.coderellaProject.service.PapersetterSubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "http://localhost:5173")
public class PapersetterSubjectController {

    @Autowired
    private PapersetterSubjectService service;

    @GetMapping("/papersetter/{registrationId}")
    public List<PapersetterSubject> getSubjects(@PathVariable String registrationId) {
        return service.getSubjectsByRegistrationId(registrationId);
    }
}

