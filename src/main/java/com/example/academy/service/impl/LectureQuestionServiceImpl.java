package com.example.academy.service.impl;

import com.example.academy.model.LectureAnswer;
import com.example.academy.model.LectureQuestion;
import com.example.academy.repository.LectureQuestionRepository;
import com.example.academy.service.LectureQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LectureQuestionServiceImpl implements LectureQuestionService {
    @Autowired
    private LectureQuestionRepository repository;
    @Override
    public LectureQuestion findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new IllegalStateException("Could not find this question"));
    }

    @Override
    public void updateAnswer(Long id, LectureAnswer answer) {
        LectureQuestion question = findById(id);
        List<LectureAnswer> answerList = question.getAnswers();
        answerList.add(answer);
        question.setAnswers(answerList);
        repository.save(question);
    }
}
