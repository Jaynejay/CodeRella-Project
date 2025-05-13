package com.example.coderella.service.impl;

import com.example.coderella.service.NotificationService;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Override
    public void sendNotification(String userToken, String title, String messageText) {
        try {
            Message message = Message.builder()
                    .setToken(userToken)
                    .setNotification(Notification.builder()
                            .setTitle(title)
                            .setBody(messageText)
                            .build())
                    .build();

            String response = FirebaseMessaging.getInstance().send(message);
            System.out.println("✅ FCM Notification sent. Response: " + response);

        } catch (Exception e) {
            System.err.println("❌ Failed to send notification: " + e.getMessage());
            // Do not throw to avoid breaking business logic
        }
    }
}
