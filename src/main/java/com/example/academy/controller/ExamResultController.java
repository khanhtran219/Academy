package com.example.academy.controller;

import com.example.academy.model.Exam;
import com.example.academy.model.ExamResult;
import com.example.academy.model.Question;
import com.example.academy.model.User;
import com.example.academy.service.ExamResultService;
import com.example.academy.service.ExamService;
import com.example.academy.service.UserService;
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
import java.util.Map;

@Controller
public class ExamResultController {
    @Autowired
    private ExamResultService examResultService;
    @Autowired
    private ExamService examService;
    @Autowired
    private UserService userService;

    @PostMapping("/examresult/process")
    public String processExamResult(@RequestParam("examId") Long examId,
                                    HttpServletRequest request,
                                    Authentication authentication,
                                    RedirectAttributes attributes) {
        Exam exam = examService.findById(examId);
        User user = userService.findById(((User) authentication.getPrincipal()).getId());
        int score = 0;
        List<Question> questions = exam.getQuestions();
        List<String> answers = new ArrayList<String>();

        for (int i = 0; i < questions.size(); i++) {
            String ans = request.getParameter("answer" + i);
            answers.add(ans);
            if (questions.get(i).getAns().equals(ans)) {
                score += 1;
            }
        }
        ExamResult result = ExamResult.builder()
                .exam(exam)
                .user((User) authentication.getPrincipal())
                .score(score)
                .level(user.getLevel())
                .createdAt(LocalDateTime.now())
                .build();
        if(score >= (questions.size()+1)/2 && user.getLevel().ordinal() > exam.getLevel().ordinal()){
            result.setLevel(exam.getLevel());
            userService.updateLevel(user,exam.getLevel());
        }
        examResultService.save(result);
        attributes.addFlashAttribute("score",score);
        attributes.addFlashAttribute("level",result.getLevel().name());
        return "redirect:/exam/" + examId;
    }
}
