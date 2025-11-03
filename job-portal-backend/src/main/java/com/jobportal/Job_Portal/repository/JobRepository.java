package com.jobportal.Job_Portal.repository;

import com.jobportal.Job_Portal.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByCollegeId(Long collegeId);
}