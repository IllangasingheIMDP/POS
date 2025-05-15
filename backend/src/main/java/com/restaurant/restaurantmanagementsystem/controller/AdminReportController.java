package com.restaurant.restaurantmanagementsystem.controller;


import com.restaurant.restaurantmanagementsystem.dto.OrderDTO;
import com.restaurant.restaurantmanagementsystem.model.OrderStatus;
import com.restaurant.restaurantmanagementsystem.service.AdminReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reports")

public class AdminReportController {

    @Autowired
    private AdminReportService reportService;

    @GetMapping("/orders")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public List<OrderDTO> getOrderHistory(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end,
            @RequestParam("status") OrderStatus status) {
        return reportService.getOrderHistory(start, end, status);
    }
}