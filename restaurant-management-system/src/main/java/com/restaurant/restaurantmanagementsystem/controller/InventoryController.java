package com.restaurant.restaurantmanagementsystem.controller;

import com.restaurant.restaurantmanagementsystem.dto.InventoryItemDTO;
import com.restaurant.restaurantmanagementsystem.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN','CASHIER','CHEF')")
    public List<InventoryItemDTO> getAll() {
        return inventoryService.getAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public InventoryItemDTO create(@RequestBody InventoryItemDTO dto) {
        return inventoryService.create(dto);
    }

    @GetMapping("/low-stock")
    @PreAuthorize("hasRole('ADMIN','CASHIER','CHEF')")
    public List<InventoryItemDTO> getLowStock() {
        return inventoryService.getLowStockItems();
    }

}