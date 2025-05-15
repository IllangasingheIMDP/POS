package com.restaurant.restaurantmanagementsystem.dto;

import com.restaurant.restaurantmanagementsystem.model.Role;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponseDTO {
    private String message;
    private String username;
    private String role;
    private String token;

    // Constructor for error responses
    public LoginResponseDTO(String message, String username, String role) {
        this.message = message;
        this.username = username;
        this.role = role;
        this.token = null;
    }
}