package com.restaurant.restaurantmanagementsystem.service;

import com.restaurant.restaurantmanagementsystem.dto.MenuItemDTO;
import com.restaurant.restaurantmanagementsystem.mapper.MenuItemMapper;
import com.restaurant.restaurantmanagementsystem.model.Category;
import com.restaurant.restaurantmanagementsystem.model.MenuItem;
import com.restaurant.restaurantmanagementsystem.repository.CategoryRepository;
import com.restaurant.restaurantmanagementsystem.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MenuService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    public List<MenuItemDTO> getAllMenuItems() {
        return menuItemRepository.findAll().stream()
                .map(MenuItemMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<MenuItemDTO> getMenuItemById(Long id) {
        return menuItemRepository.findById(id)
                .map(MenuItemMapper::toDTO);
    }

    public MenuItemDTO createMenuItemWithImage(String name, Double price, Long categoryId, String description, boolean available, MultipartFile imageFile) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        String filename = saveImage(imageFile);

        MenuItem item = MenuItem.builder()
                .name(name)
                .price(price)
                .description(description)
                .available(available)
                .imageFilename(filename)
                .category(category)
                .build();

        return MenuItemMapper.toDTO(menuItemRepository.save(item));
    }


    public MenuItemDTO updateMenuItemWithImage(Long id, String name, Double price, Long categoryId, String description, boolean available, MultipartFile image) {
        return menuItemRepository.findById(id).map(item -> {
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            item.setName(name);
            item.setPrice(price);
            item.setDescription(description);
            item.setCategory(category);
            item.setAvailable(available);

            if (image != null && !image.isEmpty()) {
                item.setImageFilename(saveImage(image));
            }

            return MenuItemMapper.toDTO(menuItemRepository.save(item));
        }).orElseThrow(() -> new RuntimeException("Menu item not found"));
    }

    private String saveImage(MultipartFile image) {
        if (image == null || image.isEmpty()) return null;

        try {
            String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir);
            Files.createDirectories(uploadPath);
            Path filepath = uploadPath.resolve(filename);
            Files.copy(image.getInputStream(), filepath);
            return filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image", e);
        }
    }

    public boolean deleteMenuItem(Long id) {
        if (menuItemRepository.existsById(id)) {
            menuItemRepository.deleteById(id);
            return true;
        }
        return false;
    }


}
