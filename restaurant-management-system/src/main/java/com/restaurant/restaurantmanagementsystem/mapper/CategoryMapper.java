package com.restaurant.restaurantmanagementsystem.mapper;
import com.restaurant.restaurantmanagementsystem.dto.CategoryDTO;
import com.restaurant.restaurantmanagementsystem.model.Category;

public class CategoryMapper {

    public static CategoryDTO toDTO(Category category) {
        return CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }



    public static Category toEntity(CategoryDTO dto) {
        return Category.builder()
                .id(dto.getId())
                .name(dto.getName())
                .description(dto.getDescription())
                .build();
    }


}
