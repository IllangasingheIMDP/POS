package com.restaurant.restaurantmanagementsystem.model;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Order order;

    @OneToOne
    private Payment payment;

    private double totalAmount;

    private LocalDateTime issuedAt;

}
