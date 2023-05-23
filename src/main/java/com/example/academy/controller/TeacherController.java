package com.example.academy.controller;

import com.example.academy.model.Level;
import com.example.academy.model.Teacher;
import com.example.academy.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Controller
public class TeacherController {
    @Autowired
    TeacherService teacherService;

    @GetMapping("/teachers")
    public String showTeacher(Model model){
        List<Teacher> teachers = teacherService.findAll();
        model.addAttribute("teachers",teachers);
        return "teachers";
    }

    @GetMapping("/admin/teacher")
    public String show(Model model) {
        List<Teacher> teachers = teacherService.findAll();
        model.addAttribute("teachers",teachers);
        return "admin/teacher/app-teacher-list";
    }

    @GetMapping("/admin/teacher/add")
    public String addTeacher(Model model){
        Teacher teacher = Teacher.builder().build();
        model.addAttribute("teacher",teacher);
        return "admin/teacher/app-teacher-add";
    }

    @PostMapping("/admin/teacher/add")
    public String processAddTeacher(@ModelAttribute Teacher teacher,
                                    @RequestParam("img-file") MultipartFile file,
                                    @RequestParam("teacher-level") String level) throws Exception {
        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);

        File saveDirectory = new ClassPathResource("static/uploads").getFile();
        String fileName = UUID.randomUUID().toString() + "." + fileExtension;
        Path path = Paths.get(saveDirectory.getAbsolutePath() + File.separator + fileName);
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        teacher.setImg("/static/uploads/" + fileName);
        teacher.setLevel(Level.valueOf(level));
        teacherService.save(teacher);
        return "redirect:/admin/teacher";
    }
}
