package com.example.academy.service.impl;

import com.example.academy.model.Practice;
import com.example.academy.model.Question;
import com.example.academy.repository.PracticeRepository;
import com.example.academy.service.PracticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PracticeServiceImpl implements PracticeService {
    @Autowired
    private PracticeRepository repository;

    @Override
    public Practice findById(Long id) {
        Optional<Practice> practice = repository.findById(id);
        if (practice.isPresent()) {
            return practice.get();
        }else {
            throw new IllegalStateException("Couldn't find practice");
        }
    }

    @Override
    public void remove(Long id) {
        repository.deleteById(id);
    }

    @Override
    public void add(Practice practice) {
        repository.save(practice);
    }

    @Override
    public void save(Practice practice) {
        repository.save(practice);
    }

    @Override
    public List<Question> getQuestionList() {
        return null;
    }

    @Override
    public void deleteQuestion(Practice practice, Question question) {
        List<Question> questions = practice.getQuestions();
        for(Question qs: questions){
            if(qs.getId() ==  question.getId()){
                questions.remove(qs);
                break;
            }
        }
        practice.setQuestions(questions);
        save(practice);
    }
}
