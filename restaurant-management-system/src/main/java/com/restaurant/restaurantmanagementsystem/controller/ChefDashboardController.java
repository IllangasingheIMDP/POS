package com.restaurant.restaurantmanagementsystem.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/chef")
public class ChefDashboardController {

    @GetMapping("/dashboard")
    public String chefDashboard() {
        return "chef/dashboard"; // maps to templates/chef/dashboard.html
    }
}