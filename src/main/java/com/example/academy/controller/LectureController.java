package com.example.academy.controller;

import com.example.academy.model.Course;
import com.example.academy.model.Lecture;
import com.example.academy.model.LectureQuestion;
import com.example.academy.model.User;
import com.example.academy.service.CourseService;
import com.example.academy.service.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Controller
public class LectureController {
    @Autowired
    private LectureService lectureService;
    @Autowired
    private CourseService courseService;

    @PostMapping("/course/{courseId}/lesson/{lessonId}/comment")
    public String processComment(@PathVariable("courseId") Long courseId,
                                 @PathVariable("lessonId") Long lectureId,
                                 @RequestParam("question") String comment,
                                 Authentication authentication){
        LectureQuestion question = LectureQuestion.builder()
                .user((User) authentication.getPrincipal())
                .created_at(LocalDateTime.now())
                .updated_at(LocalDateTime.now())
                .content(comment).build();
        lectureService.updateQuestion(lectureId,question);
        return "redirect:/course/" + courseId + "/lesson/" + lectureId;
    }
}
