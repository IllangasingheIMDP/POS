package com.restaurant.restaurantmanagementsystem.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryItemDTO {
    private Long id;
    private String name;
    private int quantity;
    private int threshold;
}