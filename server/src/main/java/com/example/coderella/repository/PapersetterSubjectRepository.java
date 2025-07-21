// File: src/main/java/com/example/coderellaProject/repository/PapersetterSubjectRepository.java
package com.example.coderella.repository;

import com.example.coderella.entity.PapersetterSubject;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PapersetterSubjectRepository extends JpaRepository<PapersetterSubject, String> {

    @Query("SELECT s FROM PapersetterSubject s JOIN s.users u WHERE u.registrationId = :registrationId")
    List<PapersetterSubject> findByRegistrationId(@Param("registrationId") String registrationId);
}

