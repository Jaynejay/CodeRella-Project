package com.example.coderella.repository;

import com.example.coderella.entity.PaymentRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;


@Repository
public interface PaymentRateRepository extends JpaRepository<PaymentRate, Long> {
    Optional<PaymentRate> findByCourseCodeAndSubjectCode(String courseCode, String subjectCode);
    boolean existsByCourseCodeAndSubjectCode(String courseCode, String subjectCode);

    Optional<PaymentRate> findByCourseCodeAndSubjectCodeAndDuration(String courseCode, String subjectCode, Integer duration);

    @Query("SELECT DISTINCT p.courseCode FROM PaymentRate p")
List<String> findDistinctCourseCodes();

@Query("SELECT DISTINCT p.subjectCode FROM PaymentRate p")
List<String> findDistinctSubjectCodes();

@Query("SELECT DISTINCT p.duration FROM PaymentRate p")
List<Integer> findDistinctDurations();


}

