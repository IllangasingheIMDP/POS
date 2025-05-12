package com.restaurant.restaurantmanagementsystem.dto;

import com.restaurant.restaurantmanagementsystem.model.PaymentMethod;
import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class PaymentDTO {
    private Long id;
    private Long orderId;
    private double amount;
    private PaymentMethod method;
    private LocalDateTime timestamp;

}
