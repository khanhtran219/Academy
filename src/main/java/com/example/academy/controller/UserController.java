package com.example.academy.controller;

import com.example.academy.exception.ChangePasswordException;
import com.example.academy.model.Course;
import com.example.academy.model.User;
import com.example.academy.service.CourseService;
import com.example.academy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
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
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private CourseService courseService;


    @GetMapping("/account/my-course")
    public String showMyCourse(Model model, Authentication authentication){
        User user = (User) authentication.getPrincipal();
        List<Course> courses = courseService.findAllByUserIdAndActive(user.getId());
        model.addAttribute("courses", courses);
        return "user/my-course";
    }
    @GetMapping("/account/profile")
    public String showProfile(Authentication authentication, Model model) {
        User user = (User) authentication.getPrincipal();
        User thisUser = userService.findById(user.getId());

        model.addAttribute("user", thisUser);
        return "user/account-setting";
    }

    @PostMapping("/account/profile")
    public String updateProfile(@ModelAttribute User user,
                                @RequestParam("img-file") MultipartFile file) throws Exception{
//        if (bindingResult.hasErrors()) {
//            return "user/account-setting";
//        }
        if(!file.isEmpty()) {
            // lưu ảnh mới
            String originalFilename = file.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);

            File saveDirectory = new ClassPathResource("static/uploads").getFile();
            String fileName = UUID.randomUUID().toString() + "." + fileExtension;
            Path path = Paths.get(saveDirectory.getAbsolutePath() + File.separator + fileName);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            // xóa ảnh cũ
            File oldImg = new File(user.getAvatar());
            oldImg.delete();

            user.setAvatar("/static/uploads/" + fileName);
        }

            userService.updateUser(user);
        return "redirect:/account/profile";
    }

    @GetMapping("/account/change-password")
    public String changePassword() {
        return "user/change-password";
    }

    @PostMapping("/account/change-password")
    public String processChangePassword(@RequestParam("currentPassword") String currentPassword,
                                        @RequestParam("newPassword") String newPassword,
                                        @RequestParam("confirmPassword") String confirmPassword,
                                        Authentication authentication,
                                        Model model) {
        User user = (User) authentication.getPrincipal();
        try {
            userService.changePassword(user, currentPassword, newPassword, confirmPassword);
        } catch (ChangePasswordException e) {
            model.addAttribute("error", e.getMessage());
            return "user/change-password";
        }
        model.addAttribute("success", "Password changed successfully.");
        return "user/change-password";
    }

    @GetMapping("/admin/user")
    public String showListUser(Model model){
        List<User> users = userService.findAll();
        model.addAttribute("users",users);
        return "admin/user/app-user-list";
    }

    @GetMapping("/admin/user/{id}")
    public String showUser(@PathVariable("id") Long id,Model model){
        User user = userService.findById(id);
        model.addAttribute("user",user);
        return "admin/user/app-user-update";
    }

    @PostMapping("/admin/user/{id}/update")
    public String processUpdate(@ModelAttribute User user,
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
            File oldImg = new File(user.getAvatar());
            oldImg.delete();

            // lưu vào csdl
            user.setAvatar("/static/uploads/" + fileName);
        }
        userService.updateUser(user);
        return "redirect:/admin/user";
    }

    @GetMapping("/admin/user/add")
    public String showAddUser(Model model){
        User user = User.builder().build();
        model.addAttribute("user", user);
        return "admin/user/app-user-add";
    }

    @PostMapping("/admin/user/add")
    public String processAddUser(@ModelAttribute User user,
                                 @RequestParam("img-file") MultipartFile file) throws Exception{
        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);

        File saveDirectory = new ClassPathResource("static/uploads").getFile();
        String fileName = UUID.randomUUID().toString() + "." + fileExtension;
        Path path = Paths.get(saveDirectory.getAbsolutePath() + File.separator + fileName);
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        user.setAvatar("/static/uploads/" + fileName);

        userService.saveUser(user);
        return "redirect:/admin/user";
    }
}
