package com.example.coderella.service;

import com.example.coderella.entity.PaperSetter;
import com.example.coderella.repository.PaperSetterRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PaperSetterService {

    private final PaperSetterRepository paperSetterRepository;

    public PaperSetterService(PaperSetterRepository paperSetterRepository) {
        this.paperSetterRepository = paperSetterRepository;
    }

    public List<PaperSetter> getAllPaperSetters() {
        return paperSetterRepository.findAll();
    }

    public Optional<PaperSetter> getPaperSetterById(Long id) {
        return paperSetterRepository.findById(id);
    }

    public Optional<PaperSetter> getPaperSetterByRegistrationId(String registrationId) {
        return paperSetterRepository.findByRegistrationId(registrationId);
    }

    public PaperSetter createPaperSetter(PaperSetter paperSetter) {
        if (paperSetterRepository.existsByRegistrationId(paperSetter.getRegistrationId())) {
            throw new RuntimeException("Paper setter with registration ID " + paperSetter.getRegistrationId() + " already exists");
        }
        return paperSetterRepository.save(paperSetter);
    }

    public PaperSetter updatePaperSetter(Long id, PaperSetter paperSetterDetails) {
        PaperSetter paperSetter = paperSetterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paper setter not found with id: " + id));

        // Check if the new registration ID already exists (excluding current record)
        if (!paperSetter.getRegistrationId().equals(paperSetterDetails.getRegistrationId()) &&
            paperSetterRepository.existsByRegistrationId(paperSetterDetails.getRegistrationId())) {
            throw new RuntimeException("Paper setter with registration ID " + paperSetterDetails.getRegistrationId() + " already exists");
        }

        paperSetter.setRegistrationId(paperSetterDetails.getRegistrationId());
        paperSetter.setName(paperSetterDetails.getName());
        paperSetter.setEmail(paperSetterDetails.getEmail());
        paperSetter.setPhone(paperSetterDetails.getPhone());

        return paperSetterRepository.save(paperSetter);
    }

    public void deletePaperSetter(Long id) {
        PaperSetter paperSetter = paperSetterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paper setter not found with id: " + id));
        paperSetterRepository.delete(paperSetter);
    }

    public List<PaperSetter> searchPaperSetters(String keyword) {
        return paperSetterRepository.searchByKeyword(keyword);
    }
} 