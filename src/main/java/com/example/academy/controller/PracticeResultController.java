package com.example.academy.controller;

import com.example.academy.model.*;
import com.example.academy.service.PracticeResultService;
import com.example.academy.service.PracticeService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/practiceresult")
public class PracticeResultController {
    @Autowired
    private PracticeService practiceService;

    @Autowired
    private PracticeResultService practiceResultService;

    @PostMapping("/process")
    public String processExamResult(HttpServletRequest request,
                                    @RequestParam("practiceId") Long practiceId,
                                    @RequestParam("courseId") Long courseId,
                                    Authentication authentication,
                                    RedirectAttributes attributes) {
        Practice practice = practiceService.findById(practiceId);
        int score = 0;
        List<Question> questions = practice.getQuestions();
        List<String> answers = new ArrayList<String>();

        for (int i = 0; i < questions.size(); i++) {
            String ans = request.getParameter("answer" + i);
            answers.add(ans);
            if (questions.get(i).getAns().equals(ans)) {
                score += 1;
            }
        }
        PracticeResult practiceResult = PracticeResult.builder()
                .practice(practice)
                .user((User) authentication.getPrincipal())
                .score(score)
                .createdAt(LocalDateTime.now())
                .build();
        practiceResultService.save(practiceResult);
        attributes.addFlashAttribute("answers",answers);
        attributes.addFlashAttribute("score",score);
        return "redirect:/course/" + courseId + "/lesson/" + practiceId;
    }
}
