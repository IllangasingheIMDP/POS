package com.restaurant.restaurantmanagementsystem.controller;
import com.restaurant.restaurantmanagementsystem.dto.InvoiceDTO;
import com.restaurant.restaurantmanagementsystem.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin("*")

public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @GetMapping
    public List<InvoiceDTO> getAll() {
        return invoiceService.getAllInvoices();
    }

    @PostMapping
    public InvoiceDTO generate(@RequestParam Long orderId, @RequestParam Long paymentId) {
        return invoiceService.generateInvoice(orderId, paymentId);
    }




}

