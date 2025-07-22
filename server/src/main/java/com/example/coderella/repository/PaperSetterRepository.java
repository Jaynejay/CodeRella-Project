package com.example.coderella.repository;

import com.example.coderella.entity.PaperSetter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaperSetterRepository extends JpaRepository<PaperSetter, Long> {

    // ✅ Fetch a paper setter by registration ID
    Optional<PaperSetter> findByRegistrationId(String registrationId);

    // ✅ Check existence by registration ID
    boolean existsByRegistrationId(String registrationId);

    // ✅ Search paper setters by keyword in name or registration ID
    @Query("SELECT ps FROM PaperSetter ps WHERE ps.name LIKE %:keyword% OR ps.registrationId LIKE %:keyword%")
    List<PaperSetter> searchByKeyword(@Param("keyword") String keyword);
}
