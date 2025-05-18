import React, { useState, useEffect } from 'react';
import api from '../../constants/api';
import './scrollbar.css';
const OrderManage = () => {
    // State management
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedOrderForPayment, setSelectedOrderForPayment] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState({
        orderId: null,
        amount: 0,
        method: 'CASH',
        timestamp: new Date().toISOString()
    });

    const [orders, setOrders] = useState([]);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [payments, setPayments] = useState([]);

    const [newOrder, setNewOrder] = useState({
        customerName: '',
        orderType: 'DINE_IN',
        tableNumber: '',
        status: 'PENDING',
        items: []
    });
    const [menuItems, setMenuItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch orders and menu items on component mount
    useEffect(() => {
        fetchOrders();
        fetchMenuItems();
        fetchPayments();
    }, []);

    // Fetch all orders
    const fetchOrders = async () => {
        try {
            const response = await api.get('/orders');
            const ordersData = response.data;

            // Map payments to orders
            const ordersWithPayments = ordersData.map(order => ({
                ...order,
                payment: payments.find(payment => payment.orderId === order.id)
            }));

            setOrders(ordersWithPayments);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    const fetchPayments = async () => {
        try {
            const response = await api.get('/payments');
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };

    // Fetch menu items for order creation
    const fetchMenuItems = async () => {
        try {
            const response = await api.get('/menu');
            setMenuItems(response.data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    // Handle order status update
    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await api.put('/orders/status', {
                orderId,
                status: newStatus
            });
            fetchOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    // Handle new order creation
    const handleCreateOrder = async (e) => {
        e.preventDefault();
        try {
            await api.post('/orders/place', newOrder);
            setShowOrderModal(false);
            setNewOrder({
                customerName: '',
                orderType: 'DINE_IN',
                tableNumber: '',
                status: 'PENDING',
                items: []
            });
            fetchOrders();
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };
    // Add these functions after other function declarations
    const handlePayment = async (order) => {
        setSelectedOrderForPayment(order);
        setPaymentDetails({
            orderId: order.id,
            amount: order.totalPrice,
            method: 'CASH',
            timestamp: new Date().toISOString()
        });
        setShowPaymentModal(true);
    };

    const submitPayment = async (e) => {
        e.preventDefault();
        try {
            await api.post('/payments', paymentDetails);
            setShowPaymentModal(false);
            setSelectedOrderForPayment(null);
            await fetchPayments(); // Fetch updated payments
            await fetchOrders(); // Refresh orders with new payment status
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };
    useEffect(() => {
        if (payments.length > 0) {
            const updatedOrders = orders.map(order => ({
                ...order,
                payment: payments.find(payment => payment.orderId === order.id)
            }));
            setOrders(updatedOrders);
        }
    }, [payments]);
    // Handle adding item to order
    const handleAddItem = (menuItem) => {
        const existingItem = newOrder.items.find(item => item.menuItemId === menuItem.id);
        if (existingItem) {
            setNewOrder({
                ...newOrder,
                items: newOrder.items.map(item =>
                    item.menuItemId === menuItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            });
        } else {
            setNewOrder({
                ...newOrder,
                items: [...newOrder.items, { menuItemId: menuItem.id, quantity: 1 }]
            });
        }
    };

    return (
        <div className='flex min-h-screen w-full bg-gradient-to-br from-[#0B161A] to-[#1a2428] p-8'>
            <div className="flex-1 bg-[#141E20] rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <div className='flex-col'>
                        <h1 className="text-4xl font-bold font-['Inter'] text-white mb-2 px-2">Order Management</h1>


                        <hr className='w-full border-t-2 mt-2 border-orange-400' />
                    </div>

                    <button
                        onClick={() => setShowOrderModal(true)}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                    >
                        New Order
                    </button>
                </div>

                {/* Orders Table */}
                <div className="bg-[#1d2b2f] rounded-xl p-6 shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-gray-700">
                                    <th className="py-3 text-gray-400">Order ID</th>
                                    <th className="py-3 text-gray-400">Customer</th>
                                    <th className="py-3 text-gray-400">Type</th>
                                    <th className="py-3 text-gray-400">Table</th>
                                    <th className="py-3 text-gray-400">Status</th>
                                    <th className="py-3 text-gray-400">Total</th>

                                    <th className="py-3 text-gray-400">Payment Status</th>
                                    <th className="py-3 text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                                        <td className="py-4 text-white">#{order.id}</td>
                                        <td className="py-4 text-white">{order.customerName}</td>
                                        <td className="py-4 text-white">{order.orderType}</td>
                                        <td className="py-4 text-white">{order.tableNumber || '-'}</td>
                                        <td className="py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs ${order.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' :
                                                order.status === 'IN_PROGRESS' ? 'bg-blue-500/20 text-blue-400' :
                                                    'bg-orange-500/20 text-orange-400'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-white">LKR {order.totalPrice}</td>
                                        <td className="py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs ${order.payment ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                                }`}>
                                                {order.payment ? 'Paid' : 'Unpaid'}
                                            </span>
                                        </td>
                                        <td className="py-4 flex space-x-3">
                                            {!order.payment && order.status !== 'CANCELLED' && (
                                                <button
                                                    onClick={() => handlePayment(order)}
                                                    className="text-green-400 hover:text-green-300"
                                                >
                                                    Process Payment
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="text-orange-400 hover:text-orange-300"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add this modal component before the closing div of the return statement */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#1d2b2f] rounded-xl p-8 w-[500px]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Process Payment</h2>
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={submitPayment} className="space-y-6">
                            <div>
                                <label className="block text-gray-400 mb-2">Amount</label>
                                <input
                                    type="number"
                                    value={paymentDetails.amount}
                                    onChange={(e) => setPaymentDetails({
                                        ...paymentDetails,
                                        amount: parseFloat(e.target.value)
                                    })}
                                    className="w-full bg-[#141E20] text-white rounded-lg p-3 border border-gray-700 focus:border-orange-500 focus:outline-none"
                                    required
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-2">Payment Method</label>
                                <select
                                    value={paymentDetails.method}
                                    onChange={(e) => setPaymentDetails({
                                        ...paymentDetails,
                                        method: e.target.value
                                    })}
                                    className="w-full bg-[#141E20] text-white rounded-lg p-3 border border-gray-700 focus:border-orange-500 focus:outline-none"
                                    required
                                >
                                    <option value="CASH">Cash</option>
                                    <option value="CARD">Card</option>
                                    <option value="ONLINE">Online</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                            >
                                Complete Payment
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {/* New Order Modal */}
            {showOrderModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#1d2b2f] rounded-xl p-8 w-[800px] max-h-[90vh] overflow-y-auto no-scrollbar">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">New Order</h2>
                            <button
                                onClick={() => setShowOrderModal(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleCreateOrder} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-400 mb-2">Customer Name</label>
                                    <input
                                        type="text"
                                        value={newOrder.customerName}
                                        onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                                        className="w-full bg-[#141E20] text-white rounded-lg p-3 border border-gray-700 focus:border-orange-500 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2">Order Type</label>
                                    <select
                                        value={newOrder.orderType}
                                        onChange={(e) => setNewOrder({ ...newOrder, orderType: e.target.value })}
                                        className="w-full bg-[#141E20] text-white rounded-lg p-3 border border-gray-700 focus:border-orange-500 focus:outline-none"
                                        required
                                    >
                                        <option value="DINE_IN">Dine In</option>
                                        <option value="TAKEAWAY">Takeaway</option>
                                    </select>
                                </div>
                            </div>

                            {newOrder.orderType === 'DINE_IN' && (
                                <div>
                                    <label className="block text-gray-400 mb-2">Table Number</label>
                                    <input
                                        type="number"
                                        value={newOrder.tableNumber}
                                        onChange={(e) => setNewOrder({ ...newOrder, tableNumber: e.target.value })}
                                        className="w-full bg-[#141E20] text-white rounded-lg p-3 border border-gray-700 focus:border-orange-500 focus:outline-none"
                                        required
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-gray-400 mb-2">Menu Items</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {menuItems.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => handleAddItem(item)}
                                            className="bg-[#141E20] p-4 rounded-lg cursor-pointer hover:bg-[#1a2428] border border-gray-700"
                                        >
                                            <h3 className="text-white font-medium">{item.name}</h3>
                                            <p className="text-gray-400">LKR {item.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white font-medium mb-4">Selected Items</h3>
                                {newOrder.items.map((item) => {
                                    const menuItem = menuItems.find(m => m.id === item.menuItemId);
                                    return (
                                        <div key={item.menuItemId} className="flex justify-between items-center mb-2">
                                            <span className="text-green-400">{menuItem?.name}</span>
                                            <span className="text-orange-400">x{item.quantity}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderManage;