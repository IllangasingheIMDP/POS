package com.restaurant.restaurantmanagementsystem.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.Map;

@RestController
@RequestMapping("/api/chef")
public class ChefDashboardController {

    @GetMapping("/dashboard")
    @PreAuthorize("hasAnyRole('CHEF')")
    public Map<String, Object> getChefDashboard() {
        // Return chef dashboard data
        return Map.of(
            "status", "active",
            "message", "Chef dashboard data"
        );
    }
}