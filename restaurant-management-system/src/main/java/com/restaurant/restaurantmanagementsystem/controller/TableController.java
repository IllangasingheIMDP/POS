package com.restaurant.restaurantmanagementsystem.controller;
import com.restaurant.restaurantmanagementsystem.dto.DiningTableDTO;
import com.restaurant.restaurantmanagementsystem.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;
@RestController
@RequestMapping("/api/tables")



public class TableController {


    @Autowired
    private TableService tableService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN','CASHIER','CHEF')")
    public List<DiningTableDTO> getAll() {
        return tableService.getAllTables();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN','CASHIER','CHEF')")
    public DiningTableDTO create(@RequestBody DiningTableDTO dto) {
        return tableService.createTable(dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN','CASHIER','CHEF')")
    public void delete(@PathVariable Long id) {
        tableService.deleteTable(id);
    }

}
