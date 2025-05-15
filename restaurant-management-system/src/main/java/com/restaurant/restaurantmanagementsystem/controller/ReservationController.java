package com.restaurant.restaurantmanagementsystem.controller;
import com.restaurant.restaurantmanagementsystem.dto.ReservationDTO;
import com.restaurant.restaurantmanagementsystem.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
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
        return reservationService.createReservation(dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER','CHEF')")
    public void delete(@PathVariable Long id) {
        reservationService.deleteReservation(id);
    }

}


