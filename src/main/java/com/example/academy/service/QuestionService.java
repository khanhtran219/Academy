package com.example.academy.service;

import com.example.academy.model.Question;
import org.springframework.stereotype.Service;

@Service
public interface QuestionService {
    Question findById(Long id);
    void add(Question question);
    void remove(Long id);
}
