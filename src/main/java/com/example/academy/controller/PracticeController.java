package com.example.academy.controller;

import com.example.academy.model.Course;
import com.example.academy.model.Lecture;
import com.example.academy.model.Practice;
import com.example.academy.model.Question;
import com.example.academy.repository.PracticeRepository;
import com.example.academy.service.CourseService;
import com.example.academy.service.PracticeService;
import com.example.academy.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class PracticeController {
    @Autowired
    private PracticeService practiceService;
    @Autowired
    private CourseService courseService;
    @Autowired
    private QuestionService questionService;


    @GetMapping("/admin/course/practice/{id}")
    public  String listQuestion(Model model, @PathVariable Long id){
        Practice practice = practiceService.findById(id);
        Question question = Question.builder().build();
        model.addAttribute("question", question);
        model.addAttribute("practice", practice);
        return "admin/course/practice-details";
    }

    @PostMapping("/admin/course/add-questions")
    public String addQuestion(@ModelAttribute Question question,
                              @RequestParam("practiceId") Long id){
        Practice practice = practiceService.findById(id);
        List<Question> questions = practice.getQuestions();
        questions.add(question);
        practice.setQuestions(questions);
        practiceService.save(practice);
        return "redirect:/admin/course/practice/" + practice.getId();
    }
    @PostMapping("/admin/course/practice/{practiceId}/question/{questionId}/delete")
    public String processDeleteQuestion(@PathVariable("practiceId") Long practiceId,
                                        @PathVariable("questionId") Long questionId) {
        Practice practice = practiceService.findById(practiceId);
        Question question = questionService.findById(questionId);

        practiceService.deleteQuestion(practice, question);
        questionService.remove(practiceId);
        return "redirect:/admin/course/practice/" + practiceId;
    }
}
