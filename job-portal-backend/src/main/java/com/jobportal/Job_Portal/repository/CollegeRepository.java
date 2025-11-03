package com.jobportal.Job_Portal.repository;

import com.jobportal.Job_Portal.entity.College;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CollegeRepository extends JpaRepository<College, Long> {
    Optional<College> findByUserId(Long userId);
}
