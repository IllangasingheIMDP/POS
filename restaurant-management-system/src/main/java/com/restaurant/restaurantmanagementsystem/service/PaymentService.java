package com.restaurant.restaurantmanagementsystem.service;
import com.restaurant.restaurantmanagementsystem.dto.PaymentDTO;
import com.restaurant.restaurantmanagementsystem.mapper.PaymentMapper;
import com.restaurant.restaurantmanagementsystem.model.Order;
import com.restaurant.restaurantmanagementsystem.model.Payment;
import com.restaurant.restaurantmanagementsystem.repository.OrderRepository;
import com.restaurant.restaurantmanagementsystem.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepo;

    @Autowired
    private OrderRepository orderRepo;

    public List<PaymentDTO> getAllPayments() {
        return paymentRepo.findAll().stream()
                .map(PaymentMapper::toDTO)
                .collect(Collectors.toList());
    }

    public PaymentDTO createPayment(PaymentDTO dto) {
        Order order = orderRepo.findById(dto.getOrderId()).orElseThrow(() ->
                new RuntimeException("Order not found with ID: " + dto.getOrderId()));

        dto.setTimestamp(LocalDateTime.now());
        Payment payment = PaymentMapper.toEntity(dto, order);
        return PaymentMapper.toDTO(paymentRepo.save(payment));

    }


}
