package com.restaurant.restaurantmanagementsystem.service;
import com.restaurant.restaurantmanagementsystem.dto.CartItemDTO;
import com.restaurant.restaurantmanagementsystem.mapper.CartItemMapper;
import com.restaurant.restaurantmanagementsystem.model.CartItem;
import com.restaurant.restaurantmanagementsystem.model.MenuItem;
import com.restaurant.restaurantmanagementsystem.repository.CartItemRepository;
import com.restaurant.restaurantmanagementsystem.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List; import java.util.stream.Collectors;
@Service
public class CartItemService {
    @Autowired
    private CartItemRepository cartRepo;

    @Autowired
    private MenuItemRepository menuRepo;

    public List<CartItemDTO> getCartBySession(String sessionId) {
        return cartRepo.findBySessionId(sessionId)
                .stream()
                .map(CartItemMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CartItemDTO addToCart(CartItemDTO dto) {
        MenuItem menuItem = menuRepo.findById(dto.getMenuItemId()).orElseThrow();
        CartItem item = CartItemMapper.toEntity(dto, menuItem);
        return CartItemMapper.toDTO(cartRepo.save(item));
    }

    public void clearCart(String sessionId) {
        cartRepo.deleteBySessionId(sessionId);
    }

}
