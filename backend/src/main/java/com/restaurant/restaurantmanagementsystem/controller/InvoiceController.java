package com.restaurant.restaurantmanagementsystem.controller;
import com.restaurant.restaurantmanagementsystem.dto.InvoiceDTO;
import com.restaurant.restaurantmanagementsystem.dto.InvoiceWithOrderDTO;
import com.restaurant.restaurantmanagementsystem.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
@RestController
@RequestMapping("/api/invoices")

public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public List<InvoiceWithOrderDTO> getAll() {
         return invoiceService.getAllInvoicesWithOrderDetails();
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public InvoiceDTO generate(@RequestParam Long orderId, @RequestParam Long paymentId) {
        return invoiceService.generateInvoice(orderId, paymentId);
    }




}

