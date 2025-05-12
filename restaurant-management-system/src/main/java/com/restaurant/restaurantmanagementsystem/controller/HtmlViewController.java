package com.restaurant.restaurantmanagementsystem.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HtmlViewController {
    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }


}