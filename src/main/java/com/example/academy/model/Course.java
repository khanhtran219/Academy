package com.example.academy.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(columnDefinition = "nvarchar(MAX)")
    private String name;

    @Lob
    @Column(columnDefinition = "nvarchar(MAX)")
    private String description;

    @Column(columnDefinition = "nvarchar(MAX)")
    private String title;

    @ManyToOne(fetch = FetchType.EAGER)
    private Teacher teacher;

    private long price;

    private boolean isActive;
    private String img;

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<Lesson> lessons;

    @ManyToMany(cascade = CascadeType.DETACH ,fetch = FetchType.EAGER)
    @JoinTable(name = "course_user",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> users = new ArrayList<>();
}
