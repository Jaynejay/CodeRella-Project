// EventController.java
package com.example.coderella.controller;
import com.example.coderella.entity.Event;
import com.example.coderella.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService service;

    @GetMapping
    public List<Event> getEvents(@RequestParam Long managerId) {
        return service.listByManager(managerId);
    }
}