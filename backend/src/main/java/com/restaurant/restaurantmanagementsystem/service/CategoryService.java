package com.restaurant.restaurantmanagementsystem.service;
import com.restaurant.restaurantmanagementsystem.dto.CategoryDTO;
import com.restaurant.restaurantmanagementsystem.mapper.CategoryMapper;
import com.restaurant.restaurantmanagementsystem.model.Category;
import com.restaurant.restaurantmanagementsystem.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepo;

    public List<CategoryDTO> getAll() {
        return categoryRepo.findAll().stream()
                .map(CategoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CategoryDTO create(CategoryDTO dto) {
        Category category = CategoryMapper.toEntity(dto);
        return CategoryMapper.toDTO(categoryRepo.save(category));
    }

    public CategoryDTO update(Long id, CategoryDTO dto) {
        Category category = categoryRepo.findById(id).orElseThrow();
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        return CategoryMapper.toDTO(categoryRepo.save(category));
    }

    public void delete(Long id) {
        categoryRepo.deleteById(id);
    }

    public CategoryDTO getById(Long id) {
        return categoryRepo.findById(id)
                .map(CategoryMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Category not found"));

    }


}
