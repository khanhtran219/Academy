package com.example.academy.service;

import com.example.academy.model.Exam;
import com.example.academy.model.Question;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ExamService {
    Exam findById(Long id);
    void delete(Long id);
    void save(Exam exam);

    List<Exam> findAll();


    void deleteQuestion(Exam exam, Question question);
}
