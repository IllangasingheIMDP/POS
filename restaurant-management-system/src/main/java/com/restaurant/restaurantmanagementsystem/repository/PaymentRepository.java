package com.restaurant.restaurantmanagementsystem.repository;

import com.restaurant.restaurantmanagementsystem.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByTimestampBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT SUM(p.amount) FROM Payment p")
    Double getTotalRevenue();

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE DATE(p.timestamp) = CURRENT_DATE")
    Double getTodayRevenue();

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE DATE(p.timestamp) = :date")
    Double getRevenueByDate(@Param("date") LocalDate date);



}
