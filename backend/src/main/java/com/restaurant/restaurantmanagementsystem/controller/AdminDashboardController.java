package com.restaurant.restaurantmanagementsystem.controller;

import com.restaurant.restaurantmanagementsystem.dto.BestSellerDTO;
import com.restaurant.restaurantmanagementsystem.dto.DashboardStatsDTO;
import com.restaurant.restaurantmanagementsystem.dto.OrderDTO;
import com.restaurant.restaurantmanagementsystem.service.DashboardService;
import com.restaurant.restaurantmanagementsystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/dashboard")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public Map<String, Object> getDashboardData() {
        // Dashboard Stats (Total Orders, Revenue, Today Stats, Active Staff)
        DashboardStatsDTO stats = dashboardService.getStats();
        
        // Top 3 Bestsellers (Last 30 Days)
        var bestsellers = dashboardService.getCurrentTopBestSellers();
        
        // Recent 10 Orders for Order Report Section
        var recentOrders = orderService.getRecentOrders();
        
        // Revenue Chart Data (Last 7 Days)
        LocalDate start = LocalDate.now().minusDays(7);
        LocalDate end = LocalDate.now();
        Map<LocalDate, Double> revenueMap = dashboardService.getDailyRevenue(start, end);
        
        return Map.of(
            "stats", stats,
            "bestsellers", bestsellers,
            "recentOrders", recentOrders,
            "dailyRevenue", revenueMap
        );
    }

    @GetMapping("/menu-manage")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public String showMenuManage() {
        return "admin/menu-manage"; // This should match the Thymeleaf template location
    }
}