package com.example.academy.service;

import com.example.academy.model.Lecture;
import com.example.academy.model.LectureQuestion;
import org.springframework.stereotype.Service;

@Service
public interface LectureService {
    Lecture findById(Long id);
    void deleteById(Long id);
    void save(Lecture lecture);
    void updateQuestion(Long id, LectureQuestion question);
}
