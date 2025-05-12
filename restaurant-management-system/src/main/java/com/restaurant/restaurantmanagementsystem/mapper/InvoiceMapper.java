package com.restaurant.restaurantmanagementsystem.mapper;
import com.restaurant.restaurantmanagementsystem.dto.InvoiceDTO;
import com.restaurant.restaurantmanagementsystem.model.Invoice;
import com.restaurant.restaurantmanagementsystem.model.Order;
import com.restaurant.restaurantmanagementsystem.model.Payment;

public class InvoiceMapper {
    public static Invoice toEntity(InvoiceDTO dto, Order order, Payment payment) {
        return Invoice.builder()
                .id(dto.getId())
                .order(order)
                .payment(payment)
                .totalAmount(dto.getTotalAmount())
                .issuedAt(dto.getIssuedAt())
                .build();
    }

    public static InvoiceDTO toDTO(Invoice invoice) {
        return InvoiceDTO.builder()
                .id(invoice.getId())
                .orderId(invoice.getOrder().getId())
                .paymentId(invoice.getPayment().getId())
                .totalAmount(invoice.getTotalAmount())
                .issuedAt(invoice.getIssuedAt())
                .build();
    }

}
