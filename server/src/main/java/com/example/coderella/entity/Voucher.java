package com.example.coderella.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "vouchers", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"voucherNumber"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Voucher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String voucherNumber;

    @Column(nullable = false)
    private String registrationId;

    @Column(nullable = false)
    private String examName;

    @Column(nullable = false)
    private String courseCode;

    @Column(nullable = false)
    private String subjectCode;

    @Column(length = 500)
    private String message;

    @Column(nullable = false)
    private String status; // PENDING, APPROVED, REJECTED

    @Column(nullable = false)
    private String submittedBy; // e.g., full name or username

    @Column(nullable = false)
    private String userId; // reference ID of user

    @CreationTimestamp
    private LocalDateTime submittedAt;

    private LocalDateTime approvedAt;
}
