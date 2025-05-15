package com.restaurant.restaurantmanagementsystem.service;
import com.restaurant.restaurantmanagementsystem.dto.DiningTableDTO;
import com.restaurant.restaurantmanagementsystem.mapper.TableMapper;
import com.restaurant.restaurantmanagementsystem.repository.TableRepository;
import com.restaurant.restaurantmanagementsystem.model.DiningTable;
import com.restaurant.restaurantmanagementsystem.model.TableStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class TableService {

    @Autowired
    private TableRepository tableRepository;

    public List<DiningTableDTO> getAllTables() {
        return tableRepository.findAll().stream()
                .map(TableMapper::toDTO)
                .collect(Collectors.toList());
    }

    public DiningTableDTO createTable(DiningTableDTO dto) {
        DiningTable table = TableMapper.toEntity(dto);
        return TableMapper.toDTO(tableRepository.save(table));
    }
    public DiningTableDTO updateTableStatus(Long id, TableStatus status) {
        DiningTable table = tableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Table not found with id: " + id));
        
        table.setStatus(status);
        return TableMapper.toDTO(tableRepository.save(table));
    }

    public void deleteTable(Long id) {
        tableRepository.deleteById(id);
    }

}
