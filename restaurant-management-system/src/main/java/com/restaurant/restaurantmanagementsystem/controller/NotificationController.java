package com.restaurant.restaurantmanagementsystem.controller;

import com.restaurant.restaurantmanagementsystem.repository.InventoryItemRepository;
import com.restaurant.restaurantmanagementsystem.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private InventoryItemRepository inventoryRepo;

    @GetMapping("/low-stock")
    public List<String> getLowStockNotifications() {
        return inventoryRepo.findByQuantityLessThan(10) // You can also make 10 dynamic if needed
                .stream()
                .map(item -> "Low stock: " + item.getName() + " (" + item.getQuantity() + " left)")
                .collect(Collectors.toList());
    }
}
