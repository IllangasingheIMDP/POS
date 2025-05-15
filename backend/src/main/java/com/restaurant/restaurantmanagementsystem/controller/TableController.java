package com.restaurant.restaurantmanagementsystem.controller;

import com.restaurant.restaurantmanagementsystem.dto.DiningTableDTO;
import com.restaurant.restaurantmanagementsystem.model.TableStatus;
import com.restaurant.restaurantmanagementsystem.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tables")

public class TableController {

    @Autowired
    private TableService tableService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public List<DiningTableDTO> getAll() {
        return tableService.getAllTables();
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public DiningTableDTO create(@RequestBody DiningTableDTO dto) {
        return tableService.createTable(dto);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public DiningTableDTO updateStatus(@PathVariable Long id, @RequestBody Map<String, String> status) {
        return tableService.updateTableStatus(id, TableStatus.valueOf(status.get("status")));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public void delete(@PathVariable Long id) {
        tableService.deleteTable(id);
    }

}
