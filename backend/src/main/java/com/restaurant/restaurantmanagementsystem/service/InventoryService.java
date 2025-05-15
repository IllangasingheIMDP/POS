package com.restaurant.restaurantmanagementsystem.service;

import com.restaurant.restaurantmanagementsystem.dto.InventoryItemDTO;
import com.restaurant.restaurantmanagementsystem.mapper.InventoryMapper;
import com.restaurant.restaurantmanagementsystem.repository.InventoryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryService {
    @Autowired
    private InventoryItemRepository inventoryRepo;

    public List<InventoryItemDTO> getAll() {
        return inventoryRepo.findAll().stream()
                .map(InventoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    public InventoryItemDTO create(InventoryItemDTO dto) {
        return InventoryMapper.toDTO(
                inventoryRepo.save(InventoryMapper.toEntity(dto))
        );
    }

    public List<InventoryItemDTO> getLowStockItems() {
        return inventoryRepo.findByQuantityLessThanEqual(5).stream() // or use dto.getThreshold()
                .map(InventoryMapper::toDTO)
                .collect(Collectors.toList());
    }

}
