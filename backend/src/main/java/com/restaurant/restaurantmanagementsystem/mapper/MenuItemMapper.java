package com.restaurant.restaurantmanagementsystem.mapper;
import com.restaurant.restaurantmanagementsystem.dto.MenuItemDTO;
import com.restaurant.restaurantmanagementsystem.model.Category;
import com.restaurant.restaurantmanagementsystem.model.MenuItem;
import org.springframework.stereotype.Component;

@Component
public class MenuItemMapper {
    public static MenuItemDTO toDTO(MenuItem item) {
        return MenuItemDTO.builder()
                .id(item.getId())
                .name(item.getName())
                .categoryId(item.getCategory().getId())
                .categoryName(item.getCategory().getName())
                .price(item.getPrice())
                .description(item.getDescription())
                .available(item.isAvailable())
                .imageFilename(item.getImageFilename())
                .build();
    }


    public static MenuItem toEntity(MenuItemDTO dto, Category category) {
        return MenuItem.builder()
                .id(dto.getId())
                .name(dto.getName())
                .category(category)
                .price(dto.getPrice())
                .description(dto.getDescription())
                .available(dto.isAvailable())
                .build();
    }




}
