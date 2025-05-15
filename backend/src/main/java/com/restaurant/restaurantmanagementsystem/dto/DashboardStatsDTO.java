package com.restaurant.restaurantmanagementsystem.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsDTO {
    private long totalOrders;
    private double totalRevenue;
    private long todayOrders;
    private double todayRevenue;
    private long activeStaff;
    private long todayReservations;

    private double revenueChangePercent;
    private double ordersChangePercent;
    private double reservationsChangePercent;

}