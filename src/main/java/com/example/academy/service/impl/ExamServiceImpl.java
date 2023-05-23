package com.example.academy.service.impl;

import com.example.academy.model.Exam;
import com.example.academy.model.Question;
import com.example.academy.repository.ExamRepository;
import com.example.academy.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamServiceImpl implements ExamService {
    @Autowired
    private ExamRepository examRepository;

    @Override
    public Exam findById(Long id) {
        return examRepository.findById(id).orElseThrow(() -> new IllegalStateException("Could not find id " + id));
    }

    @Override
    public void delete(Long id) {
        examRepository.deleteById(id);
    }

    @Override
    public void save(Exam exam) {
        examRepository.save(exam);
    }

    @Override
    public List<Exam> findAll() {
        return examRepository.findAll();
    }

    @Override
    public void deleteQuestion(Exam exam, Question question) {
        List<Question> questions = exam.getQuestions();
        for(Question qs: questions){
            if(qs.getId() ==  question.getId()){
                questions.remove(qs);
                break;
            }
        }
        exam.setQuestions(questions);
        save(exam);
    }
}
