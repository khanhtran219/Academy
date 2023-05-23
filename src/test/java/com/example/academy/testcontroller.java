package com.example.academy;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class testcontroller {

    @GetMapping("/controller")
    public String getController(){
        return "admin/app-user-list";
    }
}
