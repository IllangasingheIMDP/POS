package com.restaurant.restaurantmanagementsystem.controller;

import com.restaurant.restaurantmanagementsystem.dto.ReservationDTO;
import com.restaurant.restaurantmanagementsystem.model.ReservationStatus;
import com.restaurant.restaurantmanagementsystem.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public List<ReservationDTO> getAll() {
        return reservationService.getAllReservations();
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public ReservationDTO create(@RequestBody ReservationDTO dto) {

        System.out.println("Creating reservation: " + dto);
        return reservationService.createReservation(dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public void delete(@PathVariable Long id) {
        reservationService.deleteReservation(id);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public ReservationDTO updateStatus(@PathVariable Long id, @RequestBody Map<String, String> status) {
        return reservationService.updateReservationStatus(id, ReservationStatus.valueOf(status.get("status")));
    }

}
