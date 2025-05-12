package com.restaurant.restaurantmanagementsystem.mapper;

import com.restaurant.restaurantmanagementsystem.dto.InventoryItemDTO;
import com.restaurant.restaurantmanagementsystem.model.InventoryItem;

public class InventoryMapper {
    public static InventoryItemDTO toDTO(InventoryItem item) {
        return InventoryItemDTO.builder()
                .id(item.getId())
                .name(item.getName())
                .quantity(item.getQuantity())
                .threshold(item.getThreshold())
                .build();
    }


    public static InventoryItem toEntity(InventoryItemDTO dto) {
        return InventoryItem.builder()
                .id(dto.getId())
                .name(dto.getName())
                .quantity(dto.getQuantity())
                .threshold(dto.getThreshold())
                .build();
    }
}