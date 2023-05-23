package com.example.academy.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity(name = "lesson")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "lesson_type")
public abstract class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "nvarchar(MAX)")
    private String title;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;

}
