package com.restaurant.restaurantmanagementsystem.controller;

import com.restaurant.restaurantmanagementsystem.dto.MenuItemDTO;
import com.restaurant.restaurantmanagementsystem.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "*")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping
    public ResponseEntity<List<MenuItemDTO>> getAll() {
        return ResponseEntity.ok(menuService.getAllMenuItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuItemDTO> getById(@PathVariable Long id) {
        return menuService.getMenuItemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Create a new dish with optional image and availability
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<MenuItemDTO> addDish(
            @RequestParam("name") String name,
            @RequestParam("price") Double price,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "available", defaultValue = "true") boolean available,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        MenuItemDTO dto = menuService.createMenuItemWithImage(name, price, categoryId, description, available, image);
        return ResponseEntity.ok(dto);
    }

    // ✅ Update an existing dish with optional new image and availability
    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<MenuItemDTO> updateDish(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("price") Double price,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "available", defaultValue = "true") boolean available,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        MenuItemDTO dto = menuService.updateMenuItemWithImage(id, name, price, categoryId, description, available, image);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = menuService.deleteMenuItem(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }


}
