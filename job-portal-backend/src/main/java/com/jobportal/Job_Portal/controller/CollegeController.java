package com.jobportal.Job_Portal.controller;
import com.jobportal.Job_Portal.entity.College;
import com.jobportal.Job_Portal.entity.User;
import com.jobportal.Job_Portal.repository.CollegeRepository;
import com.jobportal.Job_Portal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/colleges")
public class CollegeController {

    @Autowired
    private CollegeRepository collegeRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<College> getAll() {
        return collegeRepository.findAll();
    }

    @GetMapping("/{userId}")
    public College getCollegeByUserId(@PathVariable Long userId) {
        return collegeRepository.findByUserId(userId).orElse(null);
    }


    @PostMapping
    public College create(@RequestBody College c) {
        College college = new College();
        college.setName(c.getName());
        college.setAddress(c.getAddress());
        college.setDescription(c.getDescription());
        college.setContact(c.getContact());
        // Fetch and set User by ID
        if (c.getUser() != null && c.getUser().getId() != null) {
            User user = userRepository.findById(c.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            college.setUser(user);
        }
        return collegeRepository.save(college);
    }

    @PutMapping("/verify/{id}")
    public College verifyCollege(@PathVariable Long id) {
        College exist = collegeRepository.findById(id).orElseThrow();
        exist.setVerified(!exist.isVerified());
        return collegeRepository.save(exist);
    }

    @DeleteMapping("/{id}")
    public String deleteCollege(@PathVariable Long id) {
        return collegeRepository.findById(id)
                .map(college -> {
                    collegeRepository.delete(college); // cascades to delete user
                    return "College and associated user deleted successfully";
                })
                .orElse(null);
    }

}
