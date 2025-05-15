import React, { useState, useEffect } from 'react';
import api from '../constants/api';

const CashierDashboard = () => {
  // State management
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    todayOrders: 0,
    pendingOrders: 0,
    totalReservations: 0
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchOrders();
    fetchReservations();
  }, []);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      console.log('Orders:', response.data);
      setOrders(response.data);
      
      // Calculate dashboard stats
      const today = new Date().toISOString().split('T')[0];
      const todayOrders = response.data.filter(order => 
        order.createdTime.split('T')[0] === today
      );
      const pendingOrders = response.data.filter(order => 
        order.status === 'PENDING'
      );

      setDashboardStats(prev => ({
        ...prev,
        todayOrders: todayOrders.length,
        pendingOrders: pendingOrders.length
      }));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Fetch reservations
  const fetchReservations = async () => {
    try {
      const response = await api.get('/reservations');
      console.log('Reservations:', response.data);
      setReservations(response.data);
      
      // Update reservations count
      const today = new Date().toISOString().split('T')[0];
      const todayReservations = response.data.filter(reservation => 
        reservation.date === today
      );

      setDashboardStats(prev => ({
        ...prev,
        totalReservations: todayReservations.length
      }));
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  // Handle new reservation
  const handleAddReservation = async (reservationData) => {
    try {
      await api.post('/api/reservations', reservationData);
      fetchReservations(); // Refresh reservations
    } catch (error) {
      console.error('Error adding reservation:', error);
    }
  };

  // Handle order status update
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.put('/api/orders/status', {
        orderId,
        status: newStatus
      });
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Update the summary cards data
  const summaryCards = [
    { 
      title: "TODAY'S ORDERS", 
      value: dashboardStats.todayOrders.toString(), 
      subtext: "Orders Completed" 
    },
    { 
      title: "PENDING ORDERS", 
      value: dashboardStats.pendingOrders.toString(), 
      subtext: "Need Attention" 
    },
    { 
      title: "RESERVATIONS", 
      value: dashboardStats.totalReservations.toString(), 
      subtext: "Today's Bookings" 
    },
    { 
      title: "POPULAR DISHES", 
      chart: true 
    }
  ];

  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);

  return (
    <div className='flex min-h-screen w-full bg-gradient-to-br from-[#0B161A] to-[#1a2428] p-8'>
      <div className="flex-1 bg-[#141E20] rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold font-['Inter'] text-white mb-2">Cashier Dashboard</h1>
            <p className="text-base text-gray-400 font-medium">{formattedDate}</p>
          </div>
          <div className="flex items-center space-x-6">
            
            <div className="flex items-center bg-[#1d2b2f] py-2 px-4 rounded-lg shadow-lg">
              <span className="text-xl font-medium mr-4 text-white">John Doe</span>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl">👤</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {summaryCards.map((card, index) => (
            <div key={index} className="bg-[#1d2b2f] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
              <h2 className="text-lg font-semibold text-gray-300">{card.title}</h2>
              {card.chart ? (
                <div className="flex space-x-3 mt-4 items-end h-24">
                  {[14, 24, 16, 10].map((height, i) => (
                    <div key={i} className="w-3 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-sm" 
                         style={{ height: `${height * 4}px` }}></div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="text-4xl font-bold text-white mt-2">{card.value}</p>
                  {card.subtext && <p className="text-sm text-gray-400 mt-1">{card.subtext}</p>}
                </>
              )}
            </div>
          ))}
        </div>
          {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {[
            { title: "ADD MENU ITEM", icon: "➕" },
            { title: "ADD RESERVATION", icon: "📅" }
          ].map((button, index) => (
            <div key={index} className="bg-[#1d2b2f] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
              <button className="w-full p-6 flex items-center justify-center space-x-3">
                <span className="text-2xl">{button.icon}</span>
                <span className="text-lg font-semibold text-orange-400">{button.title}</span>
              </button>
            </div>
          ))}
        </div>
        {/* Bottom Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#1d2b2f] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
            <h2 className="text-2xl font-semibold text-orange-400 text-center mb-4">Update Inventory</h2>
            <div className="space-y-4">
              {/* Add inventory content here */}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-[#1d2b2f] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Staff on Shift</h2>
              <div className="flex justify-center space-x-4">
                {[1, 2, 3].map((staff, index) => (
                  <div key={index} className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👤</span>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="px-3 py-1 bg-[#243236] rounded-full">
                        <span className="text-xs text-gray-300">Chef {staff}</span>
                      </div>
                    </div>
                  </div>
                ))}
                              </div>
            </div>
            <div className="bg-[#1d2b2f] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-2">Inventory Alerts</h2>
              <div className="space-y-2">
                <div className="flex items-center text-orange-400">
                  <span className="mr-2">⚠️</span>
                  <span>Low stock: Mushrooms, Tomatoes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ...rest of your existing JSX... */}
      </div>
    </div>
  );
};

export default CashierDashboard;