package com.restaurant.restaurantmanagementsystem.mapper;
import com.restaurant.restaurantmanagementsystem.dto.PaymentDTO;
import com.restaurant.restaurantmanagementsystem.model.Order;
import com.restaurant.restaurantmanagementsystem.model.Payment;

public class PaymentMapper {
    public static PaymentDTO toDTO(Payment payment) {
        return PaymentDTO.builder()
                .id(payment.getId())
                .orderId(payment.getOrder().getId())
                .amount(payment.getAmount())
                .method(payment.getMethod())
                .timestamp(payment.getTimestamp())
                .build();
    }

    public static Payment toEntity(PaymentDTO dto, Order order) {
        return Payment.builder()
                .id(dto.getId())
                .order(order)
                .amount(dto.getAmount())
                .method(dto.getMethod())
                .timestamp(dto.getTimestamp())
                .build();
    }

}
