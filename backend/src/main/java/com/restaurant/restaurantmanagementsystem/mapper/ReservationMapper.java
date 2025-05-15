package com.restaurant.restaurantmanagementsystem.mapper;
import com.restaurant.restaurantmanagementsystem.dto.ReservationDTO;
import com.restaurant.restaurantmanagementsystem.model.DiningTable;
import com.restaurant.restaurantmanagementsystem.model.Reservation;
public class ReservationMapper {
    public static ReservationDTO toDTO(Reservation res) {
        return ReservationDTO.builder()
                .id(res.getId())
                .customerName(res.getCustomerName())
                .contactNumber(res.getContactNumber())
                .date(res.getDate())
                .time(res.getTime())
                .numberOfGuests(res.getNumberOfGuests())
                .tableNumber(res.getTable() != null ? res.getTable().getTableNumber() : null)
                .status(res.getStatus())
                .build();
    }


    public static Reservation toEntity(ReservationDTO dto, DiningTable table) {
        return Reservation.builder()
                .id(dto.getId())
                .customerName(dto.getCustomerName())
                .contactNumber(dto.getContactNumber())
                .date(dto.getDate())
                .time(dto.getTime())
                .numberOfGuests(dto.getNumberOfGuests())
                .table(table)
                .status(dto.getStatus())
                .build();
    }
}
