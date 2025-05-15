package com.restaurant.restaurantmanagementsystem.controller;
import com.restaurant.restaurantmanagementsystem.dto.PaymentDTO;
import com.restaurant.restaurantmanagementsystem.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public List<PaymentDTO> getAll() {
        return paymentService.getAllPayments();
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public PaymentDTO create(@RequestBody PaymentDTO dto) {
        return paymentService.createPayment(dto);
    }

}
