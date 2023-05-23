package com.example.academy.controller;

import com.example.academy.model.Course;
import com.example.academy.model.Teacher;
import com.example.academy.model.User;
import com.example.academy.service.BillService;
import com.example.academy.service.CourseService;
import com.example.academy.service.TeacherService;
import com.example.academy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
public class HomeController {
    @Autowired
    private UserService userService;
    @Autowired
    private CourseService courseService;
    @Autowired
    private TeacherService teacherService;

    @GetMapping("/home")
    public String root(Model model){
        List<Course> courses = courseService.findRandomActiveCourses();
        model.addAttribute("courses", courses);
        List<Teacher> teachers = teacherService.findRandomActiveTeachers();
        model.addAttribute("teachers", teachers);
        return "index";
    }
    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @GetMapping("/register")
    public String register(Model model){
        return "register";
    }

    @PostMapping("/register")
    public String processRegister(@ModelAttribute User user,
                                  RedirectAttributes redirectAttributes){
        try{
            userService.create(user);
        }catch (Exception e){

            redirectAttributes.addFlashAttribute("emailError","Email đã được sử dụng.");
            return "redirect:/register";
        }
        return "redirect:/login";
    }

    @GetMapping("/about")
    public String showAbout(){
        return "about";
    }
}
