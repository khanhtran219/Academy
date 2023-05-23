package com.example.academy.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "teacher")
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "nvarchar(MAX)")
    private String name;
    private String email;
    private String img;

    @Lob
    @Column(columnDefinition = "nvarchar(MAX)")
    private String bio;
    private Level level;

    @OneToMany(mappedBy = "teacher")
    private List<Course> courses;

}
