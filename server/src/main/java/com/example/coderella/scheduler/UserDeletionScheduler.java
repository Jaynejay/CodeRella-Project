package com.example.coderella.scheduler;

import com.example.coderella.entity.User;
import com.example.coderella.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class UserDeletionScheduler {

    private final UserRepository userRepository;

    // Run every day at midnight
    @Scheduled(cron = "0 0 0 * * *")
    //@Scheduled(fixedRate = 60000) // every 60 seconds for test
    public void permanentlyDeleteScheduledUsers() {
        List<User> usersToDelete = userRepository.findAll().stream()
                .filter(user -> user.isScheduledForDeletion()
                        && user.getDeletionScheduledAt() != null
                        && LocalDateTime.now().isAfter(user.getDeletionScheduledAt()))
                .toList();

        for (User user : usersToDelete) {
            userRepository.delete(user);
            System.out.println("Deleted user: " + user.getUsername());
        }
    }
}
