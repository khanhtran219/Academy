package com.example.academy.service.impl;

import com.example.academy.model.Lecture;
import com.example.academy.model.LectureQuestion;
import com.example.academy.model.Question;
import com.example.academy.repository.LectureRepository;
import com.example.academy.service.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LectureServiceImpl implements LectureService {
    @Autowired
    private LectureRepository repository;

    @Override
    public Lecture findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new IllegalStateException("Couldn't find " + id + " in repository"));
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public void save(Lecture lecture) {
        repository.save(lecture);
    }

    @Override
    public void updateQuestion(Long id, LectureQuestion question) {
        Lecture lecture = findById(id);
        List<LectureQuestion> questions = lecture.getQuestions();
        questions.add(question);
        lecture.setQuestions(questions);
        repository.save(lecture);
    }
}
