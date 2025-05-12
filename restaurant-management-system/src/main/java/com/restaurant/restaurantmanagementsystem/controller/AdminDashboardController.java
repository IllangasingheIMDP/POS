package com.restaurant.restaurantmanagementsystem.controller;

import com.restaurant.restaurantmanagementsystem.dto.BestSellerDTO;
import com.restaurant.restaurantmanagementsystem.dto.DashboardStatsDTO;
import com.restaurant.restaurantmanagementsystem.dto.OrderDTO;
import com.restaurant.restaurantmanagementsystem.service.DashboardService;
import com.restaurant.restaurantmanagementsystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;
import java.util.Map;

@Controller
@RequestMapping("/admin")
public class AdminDashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/dashboard")
    public String adminDashboard(Model model) {
        // Add active page attribute for sidebar highlighting
        model.addAttribute("activePage", "dashboard");

        // Dashboard Stats (Total Orders, Revenue, Today Stats, Active Staff)
        DashboardStatsDTO stats = dashboardService.getStats();
        model.addAttribute("stats", stats);

        // Top 3 Bestsellers (Last 30 Days)
        model.addAttribute("bestsellers", dashboardService.getCurrentTopBestSellers());

        // Recent 10 Orders for Order Report Section
        model.addAttribute("recentOrders", orderService.getRecentOrders());

        // Revenue Chart Data (Last 7 Days)
        LocalDate start = LocalDate.now().minusDays(7);
        LocalDate end = LocalDate.now();
        Map<LocalDate, Double> revenueMap = dashboardService.getDailyRevenue(start, end);
        model.addAttribute("dailyRevenue", revenueMap);

        return "admin/dashboard";
    }
    @GetMapping("/menu-manage")
    public String showMenuManage() {
        return "admin/menu-manage"; // This should match the Thymeleaf template location
    }


}