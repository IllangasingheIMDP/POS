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

  useEffect(() => {
    // Simulated API call for dashboard stats
    const fetchDashboardStats = () => {
      // Simulate API response
      const mockStats = {
        totalOrders: 156,
        inventoryAlerts: 4,
        inProgress: 8,
        completedOrders: 148,
        dailyEarnings: 78500
      };
      setDashboardStats(mockStats);
    };

    // Simulated API call for live orders
    const fetchLiveOrders = () => {
      const mockOrders = [
        {
          id: "ORD001",
          time: "10:30 AM",
          dish: "Grilled Salmon",
          table: "Table 12",
          status: "In prep",
          priority: "high"
        },
        {
          id: "ORD002",
          time: "10:45 AM",
          dish: "Chicken Alfredo",
          table: "Takeaway #45",
          status: "New",
          priority: "medium"
        },
        {
          id: "ORD003",
          time: "10:15 AM",
          dish: "Caesar Salad",
          table: "Table 08",
          status: "Done",
          priority: "low"
        },
        {
          id: "ORD004",
          time: "10:50 AM",
          dish: "Beef Steak",
          table: "Table 15",
          status: "Pending",
          priority: "high"
        },
        {
          id: "ORD005",
          time: "10:20 AM",
          dish: "Seafood Pasta",
          table: "Table 03",
          status: "Cancelled",
          priority: "medium"
        }
      ];
      setLiveOrders(mockOrders);
    };

    fetchDashboardStats();
    fetchLiveOrders();
  }, []);

  return (
    <div className='flex min-h-screen bg-gradient-to-br from-[#0B161A] to-[#1a2428] p-8'>
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
          <div className="bg-[#1d2b2f] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
            <p className="text-lg font-medium text-gray-300">Total Orders</p>
            <p className="text-2xl font-bold mt-2 text-white">{dashboardStats.totalOrders}</p>
          </div>
          <div className="bg-[#1d2b2f] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
            <p className="text-lg font-medium text-gray-300">Inventory Alerts</p>
            <p className="text-2xl font-bold mt-2 text-red-400">{dashboardStats.inventoryAlerts}</p>
          </div>
          <div className="bg-[#1d2b2f] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
            <p className="text-lg font-medium text-gray-300">In Progress</p>
            <p className="text-2xl font-bold mt-2 text-blue-400">{dashboardStats.inProgress}</p>
          </div>
          <div className="bg-[#1d2b2f] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
            <p className="text-lg font-medium text-gray-300">Completed Orders</p>
            <p className="text-2xl font-bold mt-2 text-green-400">{dashboardStats.completedOrders}</p>
          </div>
          <div className="bg-[#1d2b2f] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
            <p className="text-lg font-medium text-orange-400">Daily Earnings</p>
            <p className="text-2xl font-bold mt-2 text-orange-400">
              {dashboardStats.dailyEarnings.toLocaleString()} LKR
            </p>
          </div>
        </div>

        {/* Live Order Section */}
        <div className="bg-[#1d2b2f] p-8 rounded-xl shadow-lg border border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-white">Live Orders</h2>
          <div className="grid grid-cols-5 gap-6 mb-4 border-b border-gray-800 pb-4">
            {['Time', 'Dish', 'Table/Order', 'Status', 'Action'].map((header) => (
              <div key={header} className="text-lg font-semibold text-orange-400">
                {header}
              </div>
            ))}
          </div>

          {/* Order Status Rows */}
          {liveOrders.map((order) => (
            <div key={order.id}
              className="grid grid-cols-5 gap-6 py-4 border-b border-gray-800/50 hover:bg-[#243236] rounded-lg transition-colors duration-200">
              <div className="text-gray-300">{order.time}</div>
              <div className="text-gray-300">{order.dish}</div>
              <div className="text-gray-300">{order.table}</div>
              <div className="flex items-center">
                {order.status === 'Pending' || order.status === 'Cancelled' ? (
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${order.status === 'Pending' ? 'bg-slate-700 text-teal-400' : 'bg-red-600/20 text-red-400'
                    }`}>
                    {order.status}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${order.status === 'In prep' ? 'bg-red-500' :
                        order.status === 'New' ? 'bg-blue-500' : 'bg-green-500'
                      }`} />
                    <span className="text-gray-300">{order.status}</span>
                  </div>
                )}
              </div>
              <div className="flex space-x-4">
                {order.status === 'Pending' && (
                  <>
                    <button className="flex items-center hover:cursor-pointer  text-green-400 hover:text-green-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                      Accept
                    </button>
                    <button className="flex items-center hover:cursor-pointer  text-red-400 hover:text-red-300">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-2" />
                      Cancel
                    </button>
                  </>
                )}
                {order.status === 'In prep' && (
                  <button className="text-blue-400 hover:cursor-pointer  hover:text-blue-300">Mark Done</button>
                )}
                {order.status === 'New' && (
                  <button className="text-green-400 hover:cursor-pointer  hover:text-green-300">Start Cooking</button>
                )}
                {order.status === 'Done' && (
                  <button className="text-gray-400 hover:cursor-pointer  hover:text-gray-300">View Details</button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Order Tracking */}
        <div className="mt-8 bg-[#1d2b2f] p-6 rounded-xl shadow-lg border border-gray-800 flex items-center">
          <span className="text-xl font-medium text-white mr-6">Track by Order ID</span>
          <div className="relative">
            <div className="w-80 h-12 bg-orange-400/10 rounded-lg flex items-center px-4 border border-orange-400/20">
              <span className="text-orange-400 text-sm font-semibold mr-2">#</span>
              <input
                type="text"
                className="bg-transparent outline-none w-full text-white"
                placeholder="Enter Order ID"
              />
            </div>
          </div>
          <span className="ml-6 text-base text-gray-400">Result: Order #112 in "In Progress"</span>
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;