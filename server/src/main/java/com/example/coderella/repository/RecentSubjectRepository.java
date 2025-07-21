package com.example.coderella.repository;

import com.example.coderella.entity.RecentSubjects;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecentSubjectRepository extends JpaRepository<RecentSubjects, String> {
    List<RecentSubjects> findTop5ByOrderByLastAccessedDesc();
}
