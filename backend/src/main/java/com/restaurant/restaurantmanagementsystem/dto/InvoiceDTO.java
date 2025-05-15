package com.restaurant.restaurantmanagementsystem.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder public class InvoiceDTO
{ private Long id;
    private Long orderId;
    private Long paymentId;
    private double totalAmount;
    private LocalDateTime issuedAt;

}
