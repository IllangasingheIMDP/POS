package com.restaurant.restaurantmanagementsystem.dto;
import lombok.*;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class MenuItemDTO {
    private Long id;
    private String name;
    private Long categoryId;
    private String categoryName;
    private double price;
    private String description;
    private boolean available;
    private String imageFilename;
}



