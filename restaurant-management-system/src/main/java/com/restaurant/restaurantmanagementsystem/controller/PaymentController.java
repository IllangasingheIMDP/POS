package com.restaurant.restaurantmanagementsystem.controller;
import com.restaurant.restaurantmanagementsystem.dto.PaymentDTO;
import com.restaurant.restaurantmanagementsystem.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin("*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public List<PaymentDTO> getAll() {
        return paymentService.getAllPayments();
    }

    @PostMapping
    public PaymentDTO create(@RequestBody PaymentDTO dto) {
        return paymentService.createPayment(dto);
    }

}
