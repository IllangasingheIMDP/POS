package com.restaurant.restaurantmanagementsystem.service;
import com.restaurant.restaurantmanagementsystem.dto.OrderDTO;
import com.restaurant.restaurantmanagementsystem.dto.UpdateOrderStatusRequest;
import com.restaurant.restaurantmanagementsystem.mapper.OrderMapper;
import com.restaurant.restaurantmanagementsystem.model.Order;
import com.restaurant.restaurantmanagementsystem.repository.MenuItemRepository;
import com.restaurant.restaurantmanagementsystem.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import com.restaurant.restaurantmanagementsystem.dto.PlaceOrderRequest;
import com.restaurant.restaurantmanagementsystem.model.*;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private MenuItemRepository menuItemRepo;

    //  Get all orders
    public List<OrderDTO> getAllOrders() {
        return orderRepo.findAll().stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }


    public OrderDTO createOrder(OrderDTO dto) {
        dto.setCreatedTime(LocalDateTime.now());
        Order order = OrderMapper.toEntity(dto, menuItemRepo);
        return OrderMapper.toDTO(orderRepo.save(order));
    }


    public OrderDTO placeOrder(PlaceOrderRequest request) {
        Order order = new Order();
        order.setCustomerName(request.getCustomerName());
        order.setOrderType(OrderType.valueOf(request.getOrderType().toUpperCase()));
        order.setTableNumber(
                request.getOrderType().equalsIgnoreCase("DINE_IN") ? request.getTableNumber() : null
        );
        order.setStatus(OrderStatus.PENDING);
        order.setCreatedTime(LocalDateTime.now());

        // Create OrderItems
        List<OrderItem> items = request.getItems().stream().map(itemReq -> {
            MenuItem menuItem = menuItemRepo.findById(itemReq.getMenuItemId())
                    .orElseThrow(() -> new RuntimeException("Menu item not found: ID " + itemReq.getMenuItemId()));

            return OrderItem.builder()
                    .menuItem(menuItem)
                    .quantity(itemReq.getQuantity())
                    .itemPrice(menuItem.getPrice() * itemReq.getQuantity())
                    .order(order)
                    .build();
        }).collect(Collectors.toList());

        // Set total price
        double total = items.stream().mapToDouble(OrderItem::getItemPrice).sum();
        order.setTotalPrice(total);
        order.setItems(items);

        Order saved = orderRepo.save(order);
        return OrderMapper.toDTO(saved);
    }

    public OrderDTO updateOrderStatus(UpdateOrderStatusRequest req) {
        Order order = orderRepo.findById(req.getOrderId()).orElseThrow(() ->
                new RuntimeException("Order not found"));

        OrderStatus newStatus = OrderStatus.valueOf(req.getStatus().toUpperCase());
        order.setStatus(newStatus);

        return OrderMapper.toDTO(orderRepo.save(order));

    }

    public List<OrderDTO> getRecentOrders() {
        return orderRepo.findTop10ByOrderByCreatedTimeDesc().stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    public String exportOrdersAsCSV() {
        List<OrderDTO> orders = getAllOrders(); // Or apply filters as needed
        StringBuilder sb = new StringBuilder();

        // Header
        sb.append("Order ID,Customer Name,Total Price,Status,Created Time\n");

        // Data
        for (OrderDTO order : orders) {
            sb.append(order.getId()).append(",")
                    .append(order.getCustomerName()).append(",")
                    .append(order.getTotalPrice()).append(",")
                    .append(order.getStatus()).append(",")
                    .append(order.getCreatedTime()).append("\n");
        }

        return sb.toString();
    }


    public List<OrderDTO> filterOrders(String status, String customerName) {
        List<Order> orders;

        OrderStatus orderStatus = null;
        if (status != null && !status.isEmpty()) {
            try {
                orderStatus = OrderStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                // Invalid status provided, return empty result or all orders based on preference
                return List.of(); // Or: orders = orderRepo.findAll();
            }
        }

        if (orderStatus != null && customerName != null && !customerName.isEmpty()) {
            orders = orderRepo.findByStatusAndCustomerNameContainingIgnoreCase(orderStatus, customerName);
        } else if (orderStatus != null) {
            orders = orderRepo.findByStatus(orderStatus);
        } else if (customerName != null && !customerName.isEmpty()) {
            orders = orderRepo.findByCustomerNameContainingIgnoreCase(customerName);
        } else {
            orders = orderRepo.findAll();
        }

        return orders.stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }




}