package com.restaurant.restaurantmanagementsystem.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BestSellerDTO {
    private String itemName;
    private long totalSold;
    private String imageFilename;
}