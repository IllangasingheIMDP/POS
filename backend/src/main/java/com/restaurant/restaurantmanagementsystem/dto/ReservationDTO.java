package com.restaurant.restaurantmanagementsystem.dto;

import com.restaurant.restaurantmanagementsystem.model.ReservationStatus;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder


public class ReservationDTO {
    private Long id;
    private String customerName;
    private String contactNumber;
    private LocalDate date;
    private LocalTime time;
    private int numberOfGuests;
    private int tableNumber;
    private ReservationStatus status;
}
