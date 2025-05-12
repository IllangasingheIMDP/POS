package com.restaurant.restaurantmanagementsystem.service;
import com.restaurant.restaurantmanagementsystem.dto.OrderDTO;
import com.restaurant.restaurantmanagementsystem.mapper.OrderMapper;
import com.restaurant.restaurantmanagementsystem.model.OrderStatus;
import com.restaurant.restaurantmanagementsystem.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminReportService {

    @Autowired
    private OrderRepository orderRepo;

    public List<OrderDTO> getOrderHistory(LocalDateTime start, LocalDateTime end, OrderStatus status) {
        return orderRepo.findByCreatedTimeBetweenAndStatus(start, end, status).stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }
    }


