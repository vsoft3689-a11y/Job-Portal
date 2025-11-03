package com.jobportal.Job_Portal.controller;
import com.jobportal.Job_Portal.entity.*;
import com.jobportal.Job_Portal.repository.ApplicationRepository;
import com.jobportal.Job_Portal.repository.FacultyRepository;
import com.jobportal.Job_Portal.repository.JobRepository;
import com.jobportal.Job_Portal.repository.UserRepository;
import com.jobportal.Job_Portal.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private EmailService emailService;
    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FacultyRepository facultyRepository;

    private final String UPLOAD_DIR = "./uploads/resumes/";

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Application apply(
            @RequestParam("jobId") Long jobId,
            @RequestParam("resume") MultipartFile resumeFile,
            @RequestParam("facultyId") Long facultyId) throws IOException {

        Faculty faculty = facultyRepository.findById(facultyId)
                .orElseThrow(() -> new RuntimeException("Faculty profile not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // Define upload directory and ensure it exists
        // Store under your user directory or project root
        String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads" + File.separator + "resumes" + File.separator;

        File uploadPath = new File(UPLOAD_DIR);
        if (!uploadPath.exists()) {
            uploadPath.mkdirs();
        }

        // Save file to disk
        String fileName = System.currentTimeMillis() + "_" + resumeFile.getOriginalFilename();
        File destination = new File(uploadPath, fileName);
        resumeFile.transferTo(destination);

        // Save application to DB
        Application app = new Application();
        app.setFaculty(faculty);
        app.setJob(job);
        app.setResume(fileName);

        // Send email to applicant
        emailService.sendJobApplicationMailToApplicant(faculty.getUser().getEmail(), job.getTitle());

        return applicationRepository.save(app);
    }

    @GetMapping
    public List<Application> getAllApplications(){
        return applicationRepository.findAll();
    }

    @GetMapping("/job/{jobId}")
    public List<Application> getByJob(@PathVariable Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    @GetMapping("/faculty/{facultyId}")
    public List<Application> getByFaculty(@PathVariable Long facultyId) {
        return applicationRepository.findByFacultyId(facultyId);
    }

    @PutMapping("/{id}/status")
    public Application updateStatus(@PathVariable Long id, @RequestParam String status) {
        Application a = applicationRepository.findById(id).orElseThrow();
        a.setStatus(ApplicationStatus.valueOf(status));
        return applicationRepository.save(a);
    }

    
}
