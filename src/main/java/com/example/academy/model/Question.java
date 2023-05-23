package com.example.academy.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "question")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "nvarchar(MAX)")
    private String content;

    @Column(columnDefinition = "nvarchar(MAX)")
    private String option1;
    @Column(columnDefinition = "nvarchar(MAX)")
    private String option2;
    @Column(columnDefinition = "nvarchar(MAX)")
    private String option3;
    @Column(columnDefinition = "nvarchar(MAX)")
    private String option4;
    private String ans;
    @Lob
    @Column(columnDefinition = "nvarchar(MAX)")
    private String answer;
}
