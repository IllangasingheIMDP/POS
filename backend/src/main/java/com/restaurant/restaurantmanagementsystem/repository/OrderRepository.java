package com.restaurant.restaurantmanagementsystem.repository;

import com.restaurant.restaurantmanagementsystem.model.Order;
import com.restaurant.restaurantmanagementsystem.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByCreatedTimeBetweenAndStatus(LocalDateTime start, LocalDateTime end, OrderStatus status);

    @Query("SELECT COUNT(o) FROM Order o WHERE DATE(o.createdTime) = CURRENT_DATE")
    long countTodayOrders();

    @Query("SELECT o.status, COUNT(o) FROM Order o GROUP BY o.status")
    List<Object[]> countByStatus();

    @Query("SELECT o.orderType, COUNT(o) FROM Order o GROUP BY o.orderType")
    List<Object[]> countByOrderType();

    @Query("SELECT COUNT(o) FROM Order o WHERE DATE(o.createdTime) = :date")
    long countByDate(@Param("date") LocalDate date);

    List<Order> findTop10ByOrderByCreatedTimeDesc();

    List<Order> findByStatus(OrderStatus status);
    List<Order> findByCustomerNameContainingIgnoreCase(String customerName);
    List<Order> findByStatusAndCustomerNameContainingIgnoreCase(OrderStatus status, String customerName);

    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE DATE(o.createdTime) = CURRENT_DATE")
    Double calculateTodayRevenue();



}
