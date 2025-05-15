package com.restaurant.restaurantmanagementsystem.service;
import com.restaurant.restaurantmanagementsystem.dto.DashboardStatsDTO;
import com.restaurant.restaurantmanagementsystem.dto.BestSellerDTO;
import com.restaurant.restaurantmanagementsystem.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private PaymentRepository paymentRepo;

    @Autowired
    private OrderItemRepository orderItemRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ReservationRepository reservationRepo;


    public DashboardStatsDTO getStats() {
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);

        // Fetch revenue
        double todayRevenue = paymentRepo.getTodayRevenue() != null ? paymentRepo.getTodayRevenue() : 0.0;
        double yesterdayRevenue = paymentRepo.getRevenueByDate(yesterday) != null ? paymentRepo.getRevenueByDate(yesterday) : 0.0;
        double revenueChangePercent = calculateChangePercentage(todayRevenue, yesterdayRevenue);

        // Fetch orders
        long todayOrders = orderRepo.countByDate(today);
        long yesterdayOrders = orderRepo.countByDate(yesterday);
        double ordersChangePercent = calculateChangePercentage(todayOrders, yesterdayOrders);

        // Fetch reservations
        long todayReservations = reservationRepo.countByDate(today);
        long yesterdayReservations = reservationRepo.countByDate(yesterday);
        double reservationsChangePercent = calculateChangePercentage(todayReservations, yesterdayReservations);

        // Active Staff
        long activeStaff = userRepo.countActiveStaff();

        return DashboardStatsDTO.builder()
                .todayRevenue(todayRevenue)
                .todayOrders(todayOrders)
                .todayReservations(todayReservations)
                .revenueChangePercent(revenueChangePercent)
                .ordersChangePercent(ordersChangePercent)
                .reservationsChangePercent(reservationsChangePercent)
                .activeStaff(activeStaff)
                .build();
    }


    private double calculateChangePercentage(double today, double yesterday) {
        if (yesterday == 0) return today > 0 ? 100.0 : 0.0;
        return ((today - yesterday) / yesterday) * 100.0;
    }


    public List<BestSellerDTO> getTopBestSellers(LocalDateTime start, LocalDateTime end) {
        Pageable top5 = (Pageable) PageRequest.of(0, 5);
        return orderItemRepo.findTopSellingItemsBetween(start, end, top5);
    }

    public List<BestSellerDTO> getCurrentTopBestSellers() {
        Pageable top3 = PageRequest.of(0, 3);
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime last30Days = now.minusDays(30);
        return orderItemRepo.findTopSellingItemsBetween(last30Days, now, top3);
    }


    public Map<LocalDate, Double> getDailyRevenue(LocalDate start, LocalDate end) {
        return paymentRepo.findByTimestampBetween(start.atStartOfDay(), end.plusDays(1).atStartOfDay())
                .stream()
                .collect(Collectors.groupingBy(
                        p -> p.getTimestamp().toLocalDate(),
                        Collectors.summingDouble(p -> p.getAmount())
                ));
    }
    public List<Object[]> getOrderStatusCounts() {
        return orderRepo.countByStatus(); // Returns List<Object[]: [status, count]
    }

    public List<Object[]> getOrderTypeCounts() {
        return orderRepo.countByOrderType();   // Returns List<Object[]: [orderType, count]
    }




}
