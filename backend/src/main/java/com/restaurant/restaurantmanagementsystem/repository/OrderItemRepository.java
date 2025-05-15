package com.restaurant.restaurantmanagementsystem.repository;

import com.restaurant.restaurantmanagementsystem.dto.BestSellerDTO;
import com.restaurant.restaurantmanagementsystem.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    @Query
            ("""

     SELECT new com.restaurant.restaurantmanagementsystem.dto.BestSellerDTO(
        oi.menuItem.name,\s
        SUM(oi.quantity),\s
        oi.menuItem.imageFilename
    )
    FROM OrderItem oi
    WHERE oi.order.createdTime BETWEEN :start AND :end
    GROUP BY oi.menuItem.name, oi.menuItem.imageFilename
    ORDER BY SUM(oi.quantity) DESC
""")
    List<BestSellerDTO> findTopSellingItemsBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);








}

