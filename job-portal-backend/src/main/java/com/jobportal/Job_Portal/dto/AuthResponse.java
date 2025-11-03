package com.jobportal.Job_Portal.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String role;
    private String name;
    private Long userId;
}
