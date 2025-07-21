// EventService.java
package com.example.coderella.service;
import com.example.coderella.entity.Event;
import com.example.coderella.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service @RequiredArgsConstructor
public class EventService {
    private final EventRepository repo;
    public List<Event> listByManager(Long managerId) {
        return repo.findByCourseManagerId(managerId);
    }
}
