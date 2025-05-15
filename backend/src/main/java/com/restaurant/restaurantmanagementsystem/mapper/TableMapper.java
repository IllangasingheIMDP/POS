package com.restaurant.restaurantmanagementsystem.mapper;
import com.restaurant.restaurantmanagementsystem.dto.DiningTableDTO;
import com.restaurant.restaurantmanagementsystem.model.DiningTable;



public class TableMapper {

    public static DiningTableDTO toDTO(DiningTable table) {
        return DiningTableDTO.builder()
                .id(table.getId())
                .tableNumber(table.getTableNumber())
                .capacity(table.getCapacity())
                .status(table.getStatus())
                .build();
    }

    public static DiningTable toEntity(DiningTableDTO dto) {
        return DiningTable.builder()
                .id(dto.getId())
                .tableNumber(dto.getTableNumber())
                .capacity(dto.getCapacity())
                .status(dto.getStatus())
                .build();
    }

}
