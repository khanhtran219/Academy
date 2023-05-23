package com.example.academy.service;

import com.example.academy.model.Practice;
import com.example.academy.model.Question;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PracticeService {
    Practice findById(Long id);
    void remove(Long id);
    void add(Practice practice);
    void save(Practice practice);
    List<Question> getQuestionList();
    void deleteQuestion(Practice practice, Question question);
}
