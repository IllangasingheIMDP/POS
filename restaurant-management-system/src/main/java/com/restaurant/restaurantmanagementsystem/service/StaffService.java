package com.restaurant.restaurantmanagementsystem.service;
import com.restaurant.restaurantmanagementsystem.dto.StaffDTO;
import com.restaurant.restaurantmanagementsystem.mapper.StaffMapper;
import com.restaurant.restaurantmanagementsystem.model.Role;
import com.restaurant.restaurantmanagementsystem.model.User;
import com.restaurant.restaurantmanagementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StaffService {
    @Autowired
    private UserRepository userRepo;

    public List<StaffDTO> getAllStaff() {
        return userRepo.findAll().stream()
                .filter(user -> user.getRole() != Role.ADMIN) // Optional filter
                .map(StaffMapper::toDTO)
                .collect(Collectors.toList());
    }

    public StaffDTO createStaff(StaffDTO dto, String rawPassword) {
        User user = StaffMapper.toEntity(dto);
        user.setPassword(new BCryptPasswordEncoder().encode(rawPassword));
        return StaffMapper.toDTO(userRepo.save(user));
    }

    public StaffDTO updateStaff(Long id, StaffDTO dto, String rawPassword) {
        User existing = userRepo.findById(id).orElseThrow();
        existing.setUsername(dto.getUsername());
        existing.setRole(Role.valueOf(dto.getRole()));
        existing.setActive(dto.isActive());
        if (rawPassword != null && !rawPassword.isEmpty()) {
            existing.setPassword(new BCryptPasswordEncoder().encode(rawPassword));
        }
        return StaffMapper.toDTO(userRepo.save(existing));
    }

    public void deleteStaff(Long id) {
        userRepo.deleteById(id);
    }
}

