// EventRepository.java
package com.example.coderella.repository;
import com.example.coderella.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCourseManagerId(Long managerId);
}
