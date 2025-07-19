package com.example.coderellaProject.repository;

import com.example.coderellaProject.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    // list all subjects of a given course by its sNo
    List<Subject> findByCourse_SNo(Long sNo);

    // find one subject by course-sNo AND its unique code
    Optional<Subject> findByCourse_SNoAndCode(Long sNo, String code);

    // delete one subject by course-sNo AND its unique code
    void deleteByCourse_SNoAndCode(Long sNo, String code);
}
