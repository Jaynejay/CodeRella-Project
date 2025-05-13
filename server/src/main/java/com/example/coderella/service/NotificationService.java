package com.example.coderella.service;

public interface NotificationService {
    void sendNotification(String userToken, String title, String message);
}
