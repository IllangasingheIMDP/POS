package com.restaurant.restaurantmanagementsystem.controller;
import com.restaurant.restaurantmanagementsystem.dto.OrderDTO;
import com.restaurant.restaurantmanagementsystem.dto.PlaceOrderRequest;
import com.restaurant.restaurantmanagementsystem.dto.UpdateOrderStatusRequest;
import com.restaurant.restaurantmanagementsystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.security.access.prepost.PreAuthorize;
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public List<OrderDTO> getAll() {
        return orderService.getAllOrders();
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public OrderDTO create(@RequestBody OrderDTO dto) {
        return orderService.createOrder(dto);
    }

    @PostMapping("/place")
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public OrderDTO placeOrder(@RequestBody PlaceOrderRequest request)
    { return orderService.placeOrder(request); }

    @PutMapping("/status")
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public OrderDTO updateStatus(@RequestBody UpdateOrderStatusRequest req)
    { return orderService.updateOrderStatus(req); }



}


