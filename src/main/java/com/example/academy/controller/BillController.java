package com.example.academy.controller;

import com.example.academy.model.Bill;
import com.example.academy.model.Course;
import com.example.academy.model.User;
import com.example.academy.service.BillService;
import com.example.academy.service.CourseService;
import com.example.academy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


@Controller
public class BillController {
    @Autowired private BillService billService;

    @Autowired private CourseService courseService;

    @Autowired private UserService userService;

    @GetMapping("/cart/course/{id}")
    public String showPayment(Model model, @PathVariable Long id,
                              Authentication authentication) {
        Course course = courseService.findById(id);
        model.addAttribute("course", course);
        return "checkout/cart";
    }

    @GetMapping("/payment/{id}")
    public String processPay(@PathVariable Long id,
                             Authentication authentication,
                             Model model){
        User user = (User) authentication.getPrincipal();
        Course course = courseService.findById(id);
        Bill bill = Bill.builder()
                .user(user)
                .course(course).build();
        model.addAttribute("bill", bill);
        return "checkout/payment";
    }

    @PostMapping("/success")
    public String process(@ModelAttribute("bill") Bill bill,
                          RedirectAttributes attributes){
        User user = userService.findById(bill.getUser().getId());
        Course course = courseService.findById(bill.getCourse().getId());
        bill.setCreatedAt(LocalDateTime.now());
        bill.setCourse(course);
        bill.setUser(user);
        billService.create(bill);
        userService.addCourse(course,user);
        attributes.addFlashAttribute("bill", bill);
        return "redirect:/success";
    }

    @GetMapping("/success")
    public String showQR(){
        return "checkout/success";
    }

    @GetMapping("/admin/bill")
    public String showListBill(Model model){
        List<Bill> bills = billService.findAll();
        model.addAttribute("bills", bills);
        return "admin/invoice/list";
    }
}
