package com.restaurant.restaurantmanagementsystem.controller;
import com.restaurant.restaurantmanagementsystem.dto.DashboardStatsDTO;
import com.restaurant.restaurantmanagementsystem.dto.BestSellerDTO;
import com.restaurant.restaurantmanagementsystem.dto.OrderDTO;
import com.restaurant.restaurantmanagementsystem.service.DashboardService;
import com.restaurant.restaurantmanagementsystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")


public class DashboardController {


    @Autowired
    private OrderService orderService;


    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/stats")
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public DashboardStatsDTO getStats() {
        return dashboardService.getStats();
    }

    @GetMapping("/bestsellers")
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public List<BestSellerDTO> getTop5Bestsellers(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return dashboardService.getTopBestSellers(start, end);
    }


    @GetMapping("/daily-revenue")
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public Map<LocalDate, Double> getDailyRevenue(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return dashboardService.getDailyRevenue(start, end);
    }

    @GetMapping("/recent-orders")
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public List<OrderDTO> getRecentOrders() {
        return orderService.getRecentOrders();
    }



    @GetMapping("/export/orders/csv")
    public ResponseEntity<byte[]> exportOrdersCsv() {
        String csv = orderService.exportOrdersAsCSV();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"orders.csv\"")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csv.getBytes());
    }

    @GetMapping("/orders/filter")
    @ResponseBody
    public List<OrderDTO> filterOrders(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String customerName
    ) {
        return orderService.filterOrders(status, customerName);
    }

    @GetMapping("/most-ordered")
    @ResponseBody
    public List<BestSellerDTO> getMostOrdered(@RequestParam String period) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime start;

        switch (period.toLowerCase()) {
            case "today":
                start = now.toLocalDate().atStartOfDay();
                break;
            case "week":
                start = now.minusDays(7);
                break;
            case "month":
                start = now.minusDays(30);
                break;
            default:
                start = now.minusDays(1); // Default to last 24 hours
        }

        return dashboardService.getTopBestSellers(start, now);
    }

    @GetMapping("/admin/most-ordered-report")
    public String showMostOrderedReport(Model model) {
        List<BestSellerDTO> bestsellers = dashboardService.getTopBestSellers(
                LocalDateTime.now().minusDays(30), LocalDateTime.now()
        );
        model.addAttribute("bestsellers", bestsellers);
        return "admin/most-ordered-report";
    }

    @GetMapping("/order-distribution")
    public Map<String, Long> getOrderDistribution() {
        List<Object[]> counts = dashboardService.getOrderTypeCounts();
        Map<String, Long> result = counts.stream()
                .filter(obj -> obj[0] != null) // Ignore null types safely
                .collect(Collectors.toMap(
                        obj -> obj[0].toString(),
                        obj -> (Long) obj[1]
                ));

        // Ensure all expected types are present even if zero
        for (String type : List.of("DINE_IN", "TAKEAWAY", "DELIVERY")) {
            result.putIfAbsent(type, 0L);
        }

        return result;
    }


}
