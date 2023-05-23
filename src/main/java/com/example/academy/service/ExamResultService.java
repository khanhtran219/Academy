package com.example.academy.service;

import com.example.academy.model.ExamResult;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ExamResultService {
    ExamResult findById(Long id);
    void save(ExamResult result);
    void delete(Long id);
    void calculateScore(ExamResult result);

    List<ExamResult> findAllByExamIdAndUserId(Long id, Long id1);
}
