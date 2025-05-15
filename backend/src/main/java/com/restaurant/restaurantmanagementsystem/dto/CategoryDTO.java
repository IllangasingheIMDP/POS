package com.restaurant.restaurantmanagementsystem.dto;
import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDTO {
    private Long id;
    private String name;
    private String description;

}
