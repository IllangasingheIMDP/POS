package com.restaurant.restaurantmanagementsystem.service;

import com.restaurant.restaurantmanagementsystem.dto.LoginRequestDTO;
import com.restaurant.restaurantmanagementsystem.dto.LoginResponseDTO;
import com.restaurant.restaurantmanagementsystem.model.User;
import com.restaurant.restaurantmanagementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public LoginResponseDTO login(LoginRequestDTO request) {
        User user = userRepository.findByUsername(request.getUsername()).orElse(null);
        if (user == null || !user.getPassword().equals(request.getPassword())) {
            return new LoginResponseDTO("Invalid credentials", null, null);
        }
        return new LoginResponseDTO("Login successful", user.getUsername(), user.getRole());
    }

}
