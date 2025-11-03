package com.jobportal.Job_Portal.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "faculty")
public class Faculty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String department;
    private String qualification;
    private String experience;
    private String address;
    private String contact;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id")
    private User user;
}

