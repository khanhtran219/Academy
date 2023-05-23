package com.example.academy.service;

import com.example.academy.model.PracticeResult;
import com.example.academy.repository.PracticeResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PracticeResultService{
    PracticeResult findById(Long id);
    void save(PracticeResult practiceResult);
    void delete(Long id);

    List<PracticeResult> findAllByPracticeIdAndUserId(Long practiceId, Long UserId);
}
