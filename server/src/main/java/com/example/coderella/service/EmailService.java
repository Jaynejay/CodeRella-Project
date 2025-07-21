package com.example.coderella.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private JavaMailSender mailSender;

    public void sendResetEmail(String to, String token) {
        String subject = "Password Reset Request";
        String resetLink = "http://localhost:5173/reset-password?token=" + token;
        String text = """
            Hello,

            We received a request to reset your password.
            Please click the link below to reset it:

            %s

            If you did not request a password reset, please ignore this email.

            Regards,
            CodeRella Support Team
            """.formatted(resetLink);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

}
