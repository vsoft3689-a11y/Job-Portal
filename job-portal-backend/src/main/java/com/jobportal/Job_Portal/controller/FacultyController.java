package com.jobportal.Job_Portal.controller;

import com.jobportal.Job_Portal.entity.College;
import com.jobportal.Job_Portal.entity.Faculty;
import com.jobportal.Job_Portal.entity.User;
import com.jobportal.Job_Portal.repository.FacultyRepository;
import com.jobportal.Job_Portal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("{userId}")
    public Faculty getFacultyByUser(@PathVariable Long userId) {
        return facultyRepository.findByUserId(userId).orElse(null);
    }

    @GetMapping
    public List<Faculty> getAllFaculty(){
        return facultyRepository.findAll();
    }

    @PostMapping
    public Faculty create(@RequestBody Faculty f) {
        Faculty faculty = new Faculty();
        faculty.setFullName(f.getFullName());
        faculty.setDepartment(f.getDepartment());
        faculty.setQualification(f.getQualification());
        faculty.setAddress(f.getAddress());
        faculty.setContact(f.getContact());
        faculty.setExperience(f.getExperience());
        // Fetch and set User by ID
        if (f.getUser() != null && f.getUser().getId() != null) {
            User user = userRepository.findById(f.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            faculty.setUser(user);
        }
        return facultyRepository.save(faculty);
    }

    @PostMapping("{id}")
    public Faculty saveOrUpdateProfile(@PathVariable Long userId,@RequestBody Faculty req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Faculty faculty = facultyRepository.findByUserId(userId).orElse(null);
            faculty.setFullName(req.getFullName());
            faculty.setDepartment(req.getDepartment());
            faculty.setQualification(req.getQualification());
            faculty.setExperience(req.getExperience());
            faculty.setUser(user);
            return facultyRepository.save(faculty);
    }

    @DeleteMapping("{id}")
    public String deleteFaculty(@PathVariable Long id){
        return facultyRepository.findById(id).
        map(faculty -> {
            facultyRepository.delete(faculty);
            return "Faculty deleted successfully!";
        }).orElse(null);
    }
}


