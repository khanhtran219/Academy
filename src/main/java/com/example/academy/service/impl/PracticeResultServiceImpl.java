package com.example.academy.service.impl;

import com.example.academy.model.PracticeResult;
import com.example.academy.repository.PracticeResultRepository;
import com.example.academy.service.PracticeResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PracticeResultServiceImpl implements PracticeResultService {
    @Autowired
    private PracticeResultRepository repository;

    @Override
    public PracticeResult findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new IllegalStateException("Couldn't find practice"));
    }

    @Override
    public void save(PracticeResult practiceResult) {
        repository.save(practiceResult);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<PracticeResult> findAllByPracticeIdAndUserId(Long practiceId, Long userId) {
        return repository.findByPracticeIdAndUserId(practiceId, userId);
    }
}
