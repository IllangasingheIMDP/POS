package com.restaurant.restaurantmanagementsystem.repository;
import com.restaurant.restaurantmanagementsystem.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long>
{ List<CartItem> findBySessionId(String sessionId);
    void deleteBySessionId(String sessionId); }
