package com.restaurant.restaurantmanagementsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import com.restaurant.restaurantmanagementsystem.model.OrderStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceWithOrderDTO {
    private Long id;
    private Long orderId;
    private Long paymentId;
    private double totalAmount;
    private LocalDateTime issuedAt;
    
    // Order details
    private String customerName;
    private OrderStatus orderStatus;
    private double orderTotalPrice;
}