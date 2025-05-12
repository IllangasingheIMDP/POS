package com.restaurant.restaurantmanagementsystem.repository;

import com.restaurant.restaurantmanagementsystem.model.Staff;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff, Long> {
}

