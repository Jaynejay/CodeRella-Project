package com.example.coderella.repository;

import com.example.coderella.entity.PaymentRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRateRepository extends JpaRepository<PaymentRate, Long> {
    Optional<PaymentRate> findByCourseCodeAndSubjectCode(String courseCode, String subjectCode);
    boolean existsByCourseCodeAndSubjectCode(String courseCode, String subjectCode);
}
