package com.example.coderellaProject.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/paper-setters")
@CrossOrigin(origins = "*")
public class SimplePaperSetterController {

    // Temporary mock data - replace with database calls later
    private final List<Map<String, Object>> mockPaperSetters = new ArrayList<>();

    public SimplePaperSetterController() {
        // Initialize with sample data
        Map<String, Object> ps1 = new HashMap<>();
        ps1.put("id", 1L);
        ps1.put("registrationId", "DTET_PS5431");
        ps1.put("name", "Wimalasekera I.S.");
        ps1.put("email", "wimalasekera@example.com");
        ps1.put("phone", "+94-71-123-4567");
        mockPaperSetters.add(ps1);

        Map<String, Object> ps2 = new HashMap<>();
        ps2.put("id", 2L);
        ps2.put("registrationId", "DTET_PS7721");
        ps2.put("name", "Amarathunga A.T.");
        ps2.put("email", "amarathunga@example.com");
        ps2.put("phone", "+94-71-234-5678");
        mockPaperSetters.add(ps2);

        Map<String, Object> ps3 = new HashMap<>();
        ps3.put("id", 3L);
        ps3.put("registrationId", "DTET_PS4788");
        ps3.put("name", "Jayaprabha P.H.J.");
        ps3.put("email", "jayaprabha@example.com");
        ps3.put("phone", "+94-71-345-6789");
        mockPaperSetters.add(ps3);
    }

    @GetMapping
    public List<Map<String, Object>> getAllPaperSetters() {
        return mockPaperSetters;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getPaperSetterById(@PathVariable Long id) {
        return mockPaperSetters.stream()
                .filter(ps -> ps.get("id").equals(id))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Map<String, Object>> searchPaperSetters(@RequestParam String keyword) {
        String lowerKeyword = keyword.toLowerCase();
        return mockPaperSetters.stream()
                .filter(ps -> ps.get("name").toString().toLowerCase().contains(lowerKeyword) ||
                             ps.get("registrationId").toString().toLowerCase().contains(lowerKeyword))
                .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }
} 