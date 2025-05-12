package com.restaurant.restaurantmanagementsystem.dto;
import com.restaurant.restaurantmanagementsystem.model.OrderStatus;
import com.restaurant.restaurantmanagementsystem.model.OrderType;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder


public class OrderDTO
{ private Long id;
    private String customerName;
    private OrderType orderType;
    private Integer tableNumber;
    private OrderStatus status;
    private double totalPrice;
    private LocalDateTime createdTime;
    private List<OrderItemDTO> items;
}