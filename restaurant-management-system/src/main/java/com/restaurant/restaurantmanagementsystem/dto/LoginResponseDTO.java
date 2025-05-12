package com.restaurant.restaurantmanagementsystem.dto;

import com.restaurant.restaurantmanagementsystem.model.Role;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class LoginResponseDTO

{ private String message;
    private String username;
    private Role role; }