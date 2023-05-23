package com.example.academy.controller;

import com.example.academy.model.LectureAnswer;
import com.example.academy.model.LectureQuestion;
import com.example.academy.model.User;
import com.example.academy.service.LectureQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;

@Controller
public class LectureQuestionController {
    @Autowired
    private LectureQuestionService lectureQuestionService;

    @PostMapping("/course/{courseId}/lesson/{lessonId}/comment/{questionId}/reply")
    public String processComment(@PathVariable("courseId") Long courseId,
                                 @PathVariable("lessonId") Long lectureId,
                                 @PathVariable("questionId") Long questionId,
                                 @RequestParam("reply") String reply,
                                 Authentication authentication){
        LectureAnswer answer = LectureAnswer.builder()
                .user((User) authentication.getPrincipal())
                .created_at(LocalDateTime.now())
                .updated_at(LocalDateTime.now())
                .content(reply).build();
        lectureQuestionService.updateAnswer(questionId,answer);
        return "redirect:/course/" + courseId + "/lesson/" + lectureId;
    }
}
