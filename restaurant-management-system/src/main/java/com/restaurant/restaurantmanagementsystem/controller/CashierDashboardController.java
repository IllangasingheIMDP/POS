package com.restaurant.restaurantmanagementsystem.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/cashier")
public class CashierDashboardController {

    @GetMapping("/dashboard")
    public String cashierDashboard() {
        return "cashier/dashboard"; // maps to templates/cashier/dashboard.html
    }
}