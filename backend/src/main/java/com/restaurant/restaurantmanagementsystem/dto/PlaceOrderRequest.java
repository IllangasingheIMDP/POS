package com.restaurant.restaurantmanagementsystem.dto;
import lombok.Data;
import java.util.List;

@Data
public class PlaceOrderRequest {
    private String customerName;
    private String orderType;
    private Integer tableNumber;
    private List<ItemRequest> items;


    @Data
    public static class ItemRequest {
        private Long menuItemId;
        private int quantity;
    }

}
