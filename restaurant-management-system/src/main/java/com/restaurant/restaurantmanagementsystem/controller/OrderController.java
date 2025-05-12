package com.restaurant.restaurantmanagementsystem.controller;
import com.restaurant.restaurantmanagementsystem.dto.OrderDTO;
import com.restaurant.restaurantmanagementsystem.dto.PlaceOrderRequest;
import com.restaurant.restaurantmanagementsystem.dto.UpdateOrderStatusRequest;
import com.restaurant.restaurantmanagementsystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<OrderDTO> getAll() {
        return orderService.getAllOrders();
    }

    @PostMapping
    public OrderDTO create(@RequestBody OrderDTO dto) {
        return orderService.createOrder(dto);
    }

    @PostMapping("/place") public OrderDTO placeOrder(@RequestBody PlaceOrderRequest request)
    { return orderService.placeOrder(request); }

    @PutMapping("/status") public OrderDTO updateStatus(@RequestBody UpdateOrderStatusRequest req)
    { return orderService.updateOrderStatus(req); }



}


