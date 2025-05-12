package com.restaurant.restaurantmanagementsystem.dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemDTO {
    private Long id;
    private String sessionId;
    private Long menuItemId;
    private int quantity;
    private String notes;

}
