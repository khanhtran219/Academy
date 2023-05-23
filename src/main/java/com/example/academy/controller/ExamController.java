package com.example.academy.controller;

import com.example.academy.model.*;
import com.example.academy.service.ExamResultService;
import com.example.academy.service.ExamService;
import com.example.academy.service.QuestionService;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Controller
public class ExamController {
    @Autowired
    private ExamService examService;
    @Autowired
    private ExamResultService examResultService;
    @Autowired
    private QuestionService questionService;

    @GetMapping("/exam")
    public String showListExam(Model model){
        List<Exam> exams = examService.findAll();
        model.addAttribute("exams", exams);
        return "exams";
    }

    @GetMapping("/exam/{id}")
    public String show(@PathVariable Long id, Model model,
                       Authentication authentication) {
        Exam exam = examService.findById(id);
        model.addAttribute("exam", exam);

        List<ExamResult> results = examResultService.findAllByExamIdAndUserId(id,((User) authentication.getPrincipal()).getId());
        Collections.reverse(results);
        model.addAttribute("results",results);;
        return "exam-single";
    }

    @GetMapping("/admin/exam")
    public String exams(Model model){
        List<Exam> exams = examService.findAll();
        model.addAttribute("exams", exams);
        return "admin/exam/app-exam-list";
    }

    @PostMapping("/admin/exam/{id}/delete")
    public String processDelete(@PathVariable("id") Long id){
        examService.delete(id);
        return "redirect:/admin/exam";
    }

    @PostMapping("/admin/exam/add")
    public String processAddExam(@ModelAttribute Exam exam){
        examService.save(exam);
        return "redirect:/admin/exam/" + exam.getId();
    }

    @GetMapping("/admin/exam/{id}")
    public String Add(@PathVariable("id") Long id,
                      Model model){
        Exam exam = examService.findById(id);
        model.addAttribute("exam",exam);
        return "admin/exam/exam-details";
    }

    @PostMapping("/admin/exam/{examId}/add-question")
    public String processAdd(@PathVariable("examId") Long id,
                             @ModelAttribute Question question){
        Exam exam = examService.findById(id);
        List<Question> questions = exam.getQuestions();
        questions.add(question);
        exam.setQuestions(questions);
        examService.save(exam);
        return "redirect:/admin/exam/" + id;
    }
    @PostMapping("/admin/exam/{examId}/question/{questionId}/delete")
    public String processDeleteQuestion(@PathVariable("examId") Long examId,
                                        @PathVariable("questionId") Long questionId) {
        Exam exam = examService.findById(examId);
        Question question = questionService.findById(questionId);

        examService.deleteQuestion(exam, question);
        questionService.remove(questionId);
        return "redirect:/admin/exam/" + examId;
    }
}
