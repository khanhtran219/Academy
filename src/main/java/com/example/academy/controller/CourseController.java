package com.example.academy.controller;

import com.example.academy.model.*;
import com.example.academy.service.CourseService;
import com.example.academy.service.LessonService;
import com.example.academy.service.TeacherService;
import com.example.academy.service.UserService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Controller
public class CourseController {
    @Autowired private CourseService courseService;
    @Autowired private TeacherService teacherService;
    @Autowired private UserService userService;
    @Autowired private LessonService lessonService;

    @GetMapping("/courses")
    public String showCourses(Model model){
        List<Course> courses = courseService.findCoursesActive();
        model.addAttribute("courses",courses);
        return "courses";
    }

    @PostMapping("/courses")
    public String processSearch(@RequestParam("keyword") String keyword,
                                RedirectAttributes attributes){
        List<Course> listCourseByKeyword = courseService.findCourseActiveByKeyWord(keyword.trim());
        attributes.addFlashAttribute("listCourseByKeyWord",listCourseByKeyword);
        return "redirect:/courses";
    }

    @GetMapping("/courses/{id}")
    public String getCourse(@PathVariable Long id, Model model,
                            Authentication authentication){
        User user = (User)authentication.getPrincipal();
        User user1 = userService.findById(user.getId());
        if(user1.getCourses().contains(courseService.findById(id))){
            return "redirect:/courses/show/" + id;
        }
        Course course = courseService.findById(id);
        model.addAttribute("course",course);
        return "course";
    }

    @GetMapping("/courses/show/{id}")
    public String showCourse(Model model, @PathVariable Long id) {
        Course course = courseService.findById(id);
        List<Lesson> lessons = course.getLessons();
        if (!lessons.isEmpty()) {
            Lesson firstLesson = lessons.get(0);
            return "redirect:/course/" + id + "/lesson/" + firstLesson.getId();
        }
        // Nếu không có bài học nào trong khóa học, hoặc bài học đầu tiên không phải là bài giảng hoặc bài tập, trả về trang lỗi 404
        throw new RuntimeException();
    }

    @GetMapping("/admin/course")
    public String listCourses(Model model){
        List<Course> courses = courseService.findAll();
        model.addAttribute("courses", courses);
        return "admin/course/app-course-list";
    }

    @GetMapping("/admin/course/add")
    public String addCourse(Model model){
        Course course = Course.builder().build();
        List<Teacher> teachers = teacherService.findAll();
        model.addAttribute("teachers", teachers);
        model.addAttribute("course", course);
        return "admin/course/add";
    }

    @PostMapping("/admin/course/add")
    public String processAddCourse(@ModelAttribute Course course,
                                   @RequestParam("img-file") MultipartFile file) throws Exception {

        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);

        File saveDirectory = new ClassPathResource("static/uploads").getFile();
        String fileName = UUID.randomUUID().toString() + "." + fileExtension;
        Path path = Paths.get(saveDirectory.getAbsolutePath() + File.separator + fileName);
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        course.setImg("/static/uploads/" + fileName);
        course.setLessons(new ArrayList<>());
        courseService.saveCourse(course);
        return "redirect:/admin/course/" +course.getId();
    }

    @GetMapping("/admin/course/{id}")
    public String updateCourse(@PathVariable Long id, Model model){
        Course course = courseService.findById(id);
        Lecture lecture = Lecture.builder().build();
        model.addAttribute("course",course);
        model.addAttribute("lecture",lecture);
        return "admin/course/course-details";
    }

    @PostMapping("/admin/course/add-lecture")
    public String processAddLecture(@ModelAttribute Lecture lecture,
                                    @RequestParam("courseId") Long courseId){
        lecture.setCreated_at(LocalDateTime.now());
        lecture.setUpdated_at(LocalDateTime.now());
        Course course = courseService.findById(courseId);
        List<Lesson> list = course.getLessons();
        list.add(lecture);
        course.setLessons(list);
        courseService.saveCourse(course);
        return "redirect:/admin/course/" + course.getId();
    }

    @PostMapping("/admin/course/add-practice")
    public String processAddPractice(@ModelAttribute Practice practice,
                                     @RequestParam("courseId") Long courseId){
        practice.setCreated_at(LocalDateTime.now());
        practice.setUpdated_at(LocalDateTime.now());

        Course course = courseService.findById(courseId);
        List<Lesson> list = course.getLessons();
        list.add(practice);
        course.setLessons(list);
        courseService.saveCourse(course);
        Long id = course.getLessons().get(course.getLessons().size() - 1).getId();
        return "redirect:/admin/course/practice/" + id;
    }

    @GetMapping("/admin/course/{id}/update")
    public String showUpdate(@PathVariable("id") Long id,
                             Model model){
        Course course = courseService.findById(id);
        model.addAttribute("course", course);

        List<Teacher> teachers = teacherService.findAll();
        model.addAttribute("teachers", teachers);
        return "admin/course/app-course-update";
    }

    @PostMapping("/admin/course/update")
    public String processUpdate(@ModelAttribute Course course,
                                @RequestParam("img-file") MultipartFile file) throws Exception{
        if(!file.isEmpty()){
            // lưu ảnh mới
            String originalFilename = file.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);

            File saveDirectory = new ClassPathResource("static/uploads").getFile();
            String fileName = UUID.randomUUID().toString() + "." + fileExtension;
            Path path = Paths.get(saveDirectory.getAbsolutePath() + File.separator + fileName);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            // xóa ảnh cũ
            File oldImg = new File(course.getImg());
            oldImg.delete();

            course.setImg("/static/uploads/" + fileName);
        }

        courseService.saveCourse(course);
        return "redirect:/admin/course";
    }

    @PostMapping("/admin/course/{courseId}/lesson/{lessonId}/delete")
    public String processDelete(@PathVariable("courseId") Long courseId,
                                @PathVariable("lessonId") Long lessonId){
        Course course = courseService.findById(courseId);
        Lesson lesson = lessonService.findById(lessonId);
        courseService.deleteLesson(course,lesson);
        lessonService.delete(lesson);
        return "redirect:/admin/course/" + courseId;
    }

    @PostMapping("/admin/course/{id}/active")
    public String processActive(@PathVariable("id") Long id){
        Course course = courseService.findById(id);
        if(course.isActive() == true){
            course.setActive(false);
        }else {
            course.setActive(true);
        }
        courseService.saveCourse(course);
        return "redirect:/admin/course";
    }

    @PostMapping("/admin/course/search")
    public String search(@RequestParam("keyword") String keyword,
                         RedirectAttributes redirectAttributes){
        List<Course> listCourseByKeyword = courseService.findByKeyWord(keyword.trim());
        redirectAttributes.addFlashAttribute("listCourseByKeyword",listCourseByKeyword);
        return "redirect:/admin/course";
    }
}
