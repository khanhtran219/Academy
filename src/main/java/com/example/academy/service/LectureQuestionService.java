package com.example.academy.service;

import com.example.academy.model.LectureAnswer;
import com.example.academy.model.LectureQuestion;
import org.springframework.stereotype.Service;

@Service
public interface LectureQuestionService {
    LectureQuestion findById(Long id);
    void updateAnswer(Long id, LectureAnswer answer);
}
