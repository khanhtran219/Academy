package com.example.academy.service.impl;

import com.example.academy.model.ExamResult;
import com.example.academy.repository.ExamRepository;
import com.example.academy.repository.ExamResultRepository;
import com.example.academy.service.ExamResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamResultServiceImpl implements ExamResultService {
    @Autowired
    private ExamResultRepository resultRepository;

    @Override
    public ExamResult findById(Long id) {
        return this.resultRepository.findById(id).orElseThrow(() -> new IllegalStateException("Couldn't find id " + id));
    }

    @Override
    public void save(ExamResult result) {
        resultRepository.save(result);
    }

    @Override
    public void delete(Long id) {
        resultRepository.deleteById(id);
    }

    @Override
    public void calculateScore(ExamResult result) {

    }

    @Override
    public List<ExamResult> findAllByExamIdAndUserId(Long id, Long id1) {
        return resultRepository.findAllByExamIdAndUserId(id, id1);
    }
}
