package com.example.coderella.service.impl;

import com.example.coderella.service.NotificationService;
import com.google.firebase.messaging.*;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Override
    public void sendNotification(String userToken, String title, String message) {
        try {
            Notification notification = Notification.builder()
                    .setTitle(title)
                    .setBody(message)
                    .build();

            Message firebaseMessage = Message.builder()
                    .setToken(userToken)
                    .setNotification(notification)
                    .build();

            String response = FirebaseMessaging.getInstance().send(firebaseMessage);
            System.out.println("✅ FCM Notification Sent. Response: " + response);

        } catch (FirebaseMessagingException e) {
            System.err.println("❌ FCM Error: " + e.getMessage());
        }
    }
}
