package com.example.academy.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "lecture")
public class Lecture extends Lesson {
    @Lob
    @Column(columnDefinition = "nvarchar(MAX)")
    private String description;
    private String url;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    List<LectureQuestion> questions;

}
