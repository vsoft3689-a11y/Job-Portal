package com.jobportal.Job_Portal.controller;

import com.jobportal.Job_Portal.entity.College;
import com.jobportal.Job_Portal.entity.Job;
import com.jobportal.Job_Portal.repository.CollegeRepository;
import com.jobportal.Job_Portal.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private CollegeRepository collegeRepository;

    @GetMapping
    public List<Job> allJobs() {
        return jobRepository.findAll();
    }

    @GetMapping("{id}")
    public Job allJobById(@PathVariable Long id) {
        return jobRepository.findById(id).orElseThrow(null);
    }


    @GetMapping("/college/{collegeId}")
    public List<Job> jobsByCollege(@PathVariable Long collegeId) {
        return jobRepository.findByCollegeId(collegeId);
    }

    @PostMapping
    public Job createJob(@RequestBody Job job) {
        Long collegeId = job.getCollege().getId();

        // Check if college exists
        College college = collegeRepository.findById(collegeId)
                .orElseThrow(() -> new RuntimeException("College not found with ID: " + collegeId));

        job.setCollege(college);
        return jobRepository.save(job);
    }


    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id, @RequestBody Job job) {
        Job ex = jobRepository.findById(id).orElseThrow();
//        ex.setTitle(job.getTitle());
//        ex.setDescription(job.getDescription());
//        ex.setDepartment(job.getDepartment());
//        ex.setQualification(job.getQualification());
//        ex.setSalary(job.getSalary());
//        ex.setExperience(job.getExperience());
//        ex.setDeadline(job.getDeadline());
        ex.setStatus(job.getStatus());
        return jobRepository.save(ex);
    }

    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable Long id) {
        jobRepository.deleteById(id);
    }
}
