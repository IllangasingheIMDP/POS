package com.restaurant.restaurantmanagementsystem.controller;

import com.restaurant.restaurantmanagementsystem.dto.UserInfoDTO;
import com.restaurant.restaurantmanagementsystem.security.JwtTokenProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @GetMapping("/me")
    public ResponseEntity<UserInfoDTO> getCurrentUser(HttpServletRequest request) {
        // Get token from cookie
        if (request.getCookies() != null) {
            Optional<Cookie> jwtCookie = Arrays.stream(request.getCookies())
                    .filter(cookie -> "jwt".equals(cookie.getName()))
                    .findFirst();
            
            if (jwtCookie.isPresent()) {
                String token = jwtCookie.get().getValue();
                String username = tokenProvider.getUsernameFromJWT(token);
                String role = tokenProvider.getRoleFromJWT(token);
                return ResponseEntity.ok(new UserInfoDTO(username, role));
            }
        }
        return ResponseEntity.badRequest().build();
    }
} 