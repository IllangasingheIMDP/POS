package com.restaurant.restaurantmanagementsystem.controller;

import com.restaurant.restaurantmanagementsystem.dto.InventoryItemDTO;
import com.restaurant.restaurantmanagementsystem.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin("*")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;

    @GetMapping
    public List<InventoryItemDTO> getAll() {
        return inventoryService.getAll();
    }

    @PostMapping
    public InventoryItemDTO create(@RequestBody InventoryItemDTO dto) {
        return inventoryService.create(dto);
    }

    @GetMapping("/low-stock")
    public List<InventoryItemDTO> getLowStock() {
        return inventoryService.getLowStockItems();
    }

}