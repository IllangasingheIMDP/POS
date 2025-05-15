package com.restaurant.restaurantmanagementsystem.controller;

import com.restaurant.restaurantmanagementsystem.dto.StaffDTO;
import com.restaurant.restaurantmanagementsystem.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;

@RestController
@RequestMapping("/api/staff")
@PreAuthorize("hasAnyRole('ADMIN')")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @GetMapping
    public List<StaffDTO> getAll() {
        return staffService.getAllStaff();
    }

    @PostMapping
    public StaffDTO create(@RequestBody StaffDTO dto, @RequestParam String password) {
        System.out.println("Creating staff with password: " + dto);
        return staffService.createStaff(dto, password);
    }

    @PutMapping("/{id}")
    public StaffDTO update(@PathVariable Long id, @RequestBody StaffDTO dto, @RequestParam(required = false) String password) {
        return staffService.updateStaff(id, dto, password);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        staffService.deleteStaff(id);
    }
}

