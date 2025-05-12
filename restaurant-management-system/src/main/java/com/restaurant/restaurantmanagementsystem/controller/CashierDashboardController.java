package com.restaurant.restaurantmanagementsystem.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/cashier")
public class CashierDashboardController {

    @GetMapping("/dashboard")
    public Map<String, Object> getCashierDashboard() {
        // Return cashier dashboard data
        return Map.of(
            "status", "active",
            "message", "Cashier dashboard data"
        );
    }
}