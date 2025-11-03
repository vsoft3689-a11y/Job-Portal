package com.jobportal.Job_Portal.entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(length = 3000)
    private String description;
    private String department;
    private String qualification;
    private String experience;
    private String salary;
    private LocalDate deadline;
    private String status="active" +
            "";

    @ManyToOne
    @JoinColumn(name = "college_id")
    private College college;
}
