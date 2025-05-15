import React, { useState, useEffect } from 'react';
import api from '../constants/api';

const ChefDashboard = () => {
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);
  
  const [dashboardStats, setDashboardStats] = useState({
    totalOrders: 0,
    inventoryAlerts: 0,
    inProgress: 0,
    completedOrders: 0,
    dailyEarnings: 0
  });

  const [liveOrders, setLiveOrders] = useState([]);
  const [inventoryAlerts, setInventoryAlerts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('PENDING');

  useEffect(() => {
    fetchOrders();
    fetchInventoryAlerts();
  }, []);

  // Fetch orders and calculate stats
  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      const orders = response.data;
      
      
      // Filter orders for today
      const today = new Date().setHours(0, 0, 0, 0);
      const todaysOrders = orders.filter(order => {
        const orderDate = new Date(order.createdTime).setHours(0, 0, 0, 0);
        return orderDate === today;
      });

      setLiveOrders(todaysOrders);

      // Calculate dashboard stats with correct status counting
      const totalOrders = todaysOrders.length;
      const inProgress = todaysOrders.filter(order => 
        ['PREPARING', 'PENDING', 'IN_PROGRESS'].includes(order.status)
      ).length;
      const completed = todaysOrders.filter(order => order.status === 'COMPLETED').length;
      const dailyTotal = todaysOrders
        .filter(order => order.status === 'COMPLETED')
        .reduce((sum, order) => sum + order.totalPrice, 0);

      setDashboardStats(prev => ({
        ...prev,
        totalOrders,
        inProgress,
        completedOrders: completed,
        dailyEarnings: dailyTotal
      }));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Fetch inventory alerts
  const fetchInventoryAlerts = async () => {
    try {
      const response = await api.get('/inventory');
      const lowStockItems = response.data.filter(item => item.quantity <= item.threshold);
      setInventoryAlerts(lowStockItems);
      
      setDashboardStats(prev => ({
        ...prev,
        inventoryAlerts: lowStockItems.length
      }));
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  // Handle order status updates
  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/status`, {
        orderId,
        status: newStatus
      });
      await fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Update the Orders Section JSX
  return (
    <div className='flex w-full min-h-screen bg-gradient-to-br from-[#0B161A] to-[#1a2428] p-8'>
      <div className="flex-1 bg-[#141E20]/90 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold font-['Poppins'] text-white mb-2">Dashboard</h1>
            <p className="text-base text-gray-400 font-medium">{formattedDate}</p>
          </div>
          <div className="flex items-center bg-[#1d2b2f] py-2 px-4 rounded-lg shadow-lg">
            <span className="text-xl font-medium mr-4 text-white">Welcome, Chef John</span>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl">👨‍🍳</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          {[
            { title: "Total Orders", value: dashboardStats.totalOrders, className: "text-white" },
            { title: "Inventory Alerts", value: dashboardStats.inventoryAlerts, className: "text-red-400" },
            { title: "In Progress", value: dashboardStats.inProgress, className: "text-blue-400" },
            { title: "Completed Orders", value: dashboardStats.completedOrders, className: "text-green-400" },
            { title: "Daily Revenue", value: `${dashboardStats.dailyEarnings.toLocaleString()} LKR`, className: "text-orange-400" }
          ].map((stat, index) => (
            <div key={index} className="bg-[#1d2b2f] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
              <p className="text-lg font-medium text-gray-300">{stat.title}</p>
              <p className={`text-2xl font-bold mt-2 ${stat.className}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Live Orders Section */}
        <div className="bg-[#1d2b2f] p-8 rounded-xl shadow-lg border border-gray-800">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Live Orders</h2>
              
              {/* Updated Filter Section */}
              <div className="bg-[#141E20] p-1 rounded-xl flex space-x-1">
                {['PENDING', 'PREPARING', 'COMPLETED', 'CANCELLED'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedStatus === status
                        ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-400 hover:bg-[#1a2428] hover:text-gray-300'
                    }`}
                  >
                    {status === 'PENDING' && '🕒 '}
                    {status === 'PREPARING' && '👨‍🍳 '}
                    {status === 'COMPLETED' && '✅ '}
                    {status === 'CANCELLED' && '❌ '}
                    {status.charAt(0) + status.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-hidden rounded-xl border border-gray-800">
              <div className="grid grid-cols-5 gap-6 bg-[#141E20] p-4">
                {['Time', 'Items', 'Table/Order', 'Status', 'Action'].map((header) => (
                  <div key={header} className="text-sm font-semibold text-orange-400">
                    {header}
                  </div>
                ))}
              </div>

              <div className="divide-y divide-gray-800">
                {liveOrders
                  .filter(order => order.status === selectedStatus)
                  .map((order) => (
                    <div key={order.id}
                      className="grid grid-cols-5 gap-6 p-4 hover:bg-[#243236] transition-colors duration-200"
                    >
                      <div className="text-gray-300 text-sm">
                        {new Date(order.createdTime).toLocaleTimeString()}
                      </div>
                      <div className="text-gray-300 text-sm">
                        {order.items.map(item => item.name || item.itemName).join(', ')}
                      </div>
                      <div className="text-gray-300 text-sm">
                        {order.orderType === 'DINE_IN' ? (
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"/>
                            Table {order.tableNumber}
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"/>
                            Takeaway
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'PENDING' ? 'bg-orange-500/20 text-orange-400' :
                          order.status === 'PREPARING' ? 'bg-blue-500/20 text-blue-400' :
                          order.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {order.status}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {order.status === 'PENDING' && (
                          <>
                            <button 
                              onClick={() => handleOrderStatusUpdate(order.id, 'PREPARING')}
                              className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-sm hover:bg-green-500/20 transition-colors"
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => handleOrderStatusUpdate(order.id, 'CANCELLED')}
                              className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-sm hover:bg-red-500/20 transition-colors"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {order.status === 'PREPARING' && (
                          <>
                            <button 
                              onClick={() => handleOrderStatusUpdate(order.id, 'COMPLETED')}
                              className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-sm hover:bg-blue-500/20 transition-colors"
                            >
                              Complete
                            </button>
                            <button 
                              onClick={() => handleOrderStatusUpdate(order.id, 'CANCELLED')}
                              className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-sm hover:bg-red-500/20 transition-colors"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Tracking Section */}
        <div className="mt-8 bg-[#1d2b2f] p-6 rounded-xl shadow-lg border border-gray-800">
          <h2 className="text-xl font-bold mb-6 text-white">Inventory Alerts</h2>
          <div className="grid grid-cols-3 gap-4">
            {inventoryAlerts.map((item) => (
              <div key={item.id} className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-orange-400 font-medium">{item.name}</h3>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                    Low Stock
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Quantity: {item.quantity} / Threshold: {item.threshold}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;