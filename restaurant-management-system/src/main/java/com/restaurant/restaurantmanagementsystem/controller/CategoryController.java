package com.restaurant.restaurantmanagementsystem.controller;
import com.restaurant.restaurantmanagementsystem.dto.CategoryDTO;
import com.restaurant.restaurantmanagementsystem.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    @PreAuthorize("hasRole('CASHIER','ADMIN','CHEF')")
    public List<CategoryDTO> getAll() {
        return categoryService.getAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public CategoryDTO create(@RequestBody CategoryDTO dto) {
        return categoryService.create(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public CategoryDTO update(@PathVariable Long id, @RequestBody CategoryDTO dto) {
        return categoryService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        categoryService.delete(id);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('CASHIER','ADMIN','CHEF')")
    public CategoryDTO getById(@PathVariable Long id) {
        return categoryService.getById(id);
    }

}
