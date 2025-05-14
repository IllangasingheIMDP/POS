package com.restaurant.restaurantmanagementsystem.controller;
import com.restaurant.restaurantmanagementsystem.dto.CartItemDTO;
import com.restaurant.restaurantmanagementsystem.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;
@RestController
@RequestMapping("/api/cart")

public class CartItemController {
    @Autowired
    private CartItemService cartService;

    @GetMapping("/{sessionId}")
    @PreAuthorize("hasAnyRole('CASHIER','ADMIN','CHEF')")
    public List<CartItemDTO> getCart(@PathVariable String sessionId) {
        return cartService.getCartBySession(sessionId);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('CASHIER','ADMIN','CHEF')")
    public CartItemDTO addItem(@RequestBody CartItemDTO dto) {
        return cartService.addToCart(dto);
    }

    @DeleteMapping("/{sessionId}")
    @PreAuthorize("hasAnyRole('CASHIER','ADMIN','CHEF')")
    public void clearCart(@PathVariable String sessionId) {
        cartService.clearCart(sessionId);
    }

    

}
