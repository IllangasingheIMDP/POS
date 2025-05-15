package com.restaurant.restaurantmanagementsystem.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private MenuItem menuItem;

    private int quantity;

    private double itemPrice;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

}

