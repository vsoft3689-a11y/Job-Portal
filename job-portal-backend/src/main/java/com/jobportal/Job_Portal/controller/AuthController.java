package com.jobportal.Job_Portal.controller;

import com.jobportal.Job_Portal.dto.AuthRequest;
import com.jobportal.Job_Portal.dto.AuthResponse;
import com.jobportal.Job_Portal.entity.Role;
import com.jobportal.Job_Portal.entity.User;
import com.jobportal.Job_Portal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
//    @Autowired
//    private JwtUtils jwtUtils;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public AuthResponse register(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        String email = body.get("email");
        String password = body.get("password");
        String roleStr = body.get("role");

        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        Role role = Role.valueOf(roleStr);
        User u = new User();
        u.setName(name);
        u.setEmail(email);
        u.setPassword(passwordEncoder.encode(password));
        u.setRole(role);
        userRepository.save(u);

//        String token = jwtUtils.generateJwtToken(email);
        String token = "token";
        return new AuthResponse(token, role.name(), name, u.getId());
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest req) {
        User u = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if (!passwordEncoder.matches(req.getPassword(), u.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
//        String token = jwtUtils.generateJwtToken(u.getEmail());
        String token = "token";
        return new AuthResponse(token, u.getRole().name(), u.getName(), u.getId());
    }
}
