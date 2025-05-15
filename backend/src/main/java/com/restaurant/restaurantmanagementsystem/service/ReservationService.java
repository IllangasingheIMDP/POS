package com.restaurant.restaurantmanagementsystem.service;

import com.restaurant.restaurantmanagementsystem.dto.ReservationDTO;
import com.restaurant.restaurantmanagementsystem.mapper.ReservationMapper;
import com.restaurant.restaurantmanagementsystem.repository.ReservationRepository;
import com.restaurant.restaurantmanagementsystem.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import com.restaurant.restaurantmanagementsystem.model.DiningTable;
import com.restaurant.restaurantmanagementsystem.model.ReservationStatus;


@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private TableRepository tableRepository;

    public List<ReservationDTO> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(ReservationMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ReservationDTO createReservation(ReservationDTO dto) {
        DiningTable table = tableRepository.findByTableNumber(dto.getTableNumber())
                .orElseThrow(() -> new RuntimeException("Table not found: " + dto.getTableNumber()));

        return ReservationMapper.toDTO(
                reservationRepository.save(ReservationMapper.toEntity(dto, table))
        );
    }
    public ReservationDTO updateReservationStatus(Long id, ReservationStatus status) {
    var reservation = reservationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Reservation not found with id: " + id));
    
    reservation.setStatus(status);
    return ReservationMapper.toDTO(reservationRepository.save(reservation));
}

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}

