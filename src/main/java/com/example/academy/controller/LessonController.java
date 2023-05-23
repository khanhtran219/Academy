package com.example.academy.controller;

import com.example.academy.model.*;
import com.example.academy.service.CourseService;
import com.example.academy.service.LessonService;
import com.example.academy.service.PracticeResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
public class LessonController {
    @Autowired
    private LessonService lessonService;
    @Autowired
    private CourseService courseService;
    @Autowired
    private PracticeResultService practiceResultService;

    @GetMapping("/course/{courseId}/lesson/{lessonId}")
    public String showLesson(@PathVariable Long courseId,
                             @PathVariable Long lessonId,
                             Model model, Authentication authentication){
        Course course = courseService.findById(courseId);
        model.addAttribute("course", course);
        Lesson lesson = lessonService.findById(lessonId);

        if(lesson instanceof Lecture){
            model.addAttribute("lecture",(Lecture) lesson);
            return "lectures";
        }else {
            List<PracticeResult> results = practiceResultService.findAllByPracticeIdAndUserId(lessonId,((User) authentication.getPrincipal()).getId());
            model.addAttribute("results",results);
            model.addAttribute("practice",(Practice) lesson);
            return "practices";
        }
    }
}
