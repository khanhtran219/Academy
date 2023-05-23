package com.example.academy.service.impl;

import com.example.academy.model.Question;
import com.example.academy.repository.QuestionRepository;
import com.example.academy.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService{
    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Question findById(Long id) {
        Optional<Question> question = questionRepository.findById(id);
        if(question.isPresent()) {
            return question.get();
        }else {
            throw new RuntimeException("Could not find the question");
        }
    }

    @Override
    public void add(Question question) {
        questionRepository.save(question);
    }

    @Override
    public void remove(Long id) {
        questionRepository.deleteById(id);
    }
}
