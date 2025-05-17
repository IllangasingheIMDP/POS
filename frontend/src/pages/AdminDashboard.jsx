import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import api from '../constants/api';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Header from '../components/header';
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderStatusFilter, setOrderStatusFilter] = useState('ALL');
  const [filteredOrders, setFilteredOrders] = useState([]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/admin/dashboard');
        console.log(response);
        // Check if the response is ok (status code 200-299)
        if (!response.status===200) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.data;
        setDashboardData(data);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Replace the existing useEffect for filtering
  useEffect(() => {
    if (dashboardData?.recentOrders) {
      setFilteredOrders(
        orderStatusFilter === 'ALL' 
          ? dashboardData.recentOrders 
          : dashboardData.recentOrders.filter(order => order.status === orderStatusFilter)
      );
    }
  }, [orderStatusFilter, dashboardData]);

  // Move the destructuring after the error check
  if (loading) {
    return <div className="flex h-screen bg-neutral-900 text-white items-center justify-center">Loading...</div>;
  }
  if (error) {
    return <div className="flex h-screen bg-neutral-900 text-white items-center justify-center">Error: {error}</div>;
  }

  // Destructure after the checks
  const { stats, recentOrders, bestsellers } = dashboardData || {};

  return (
    <div className="flex w-full min-h-screen p-8 bg-[#0B161A] text-white h-auto">
      
      <div className="flex-1 w-full p-6 bg-[#141E20] rounded-2xl">
        <Header title={'Dashboard'} />
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-zinc-900 p-4 rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-800 rounded-[10px] flex items-center justify-center">
                <img src="/dollor.png" alt="revenue" className="w-7 h-7" />
              </div>
              <span className={`ml-2 text-base font-medium ${stats.revenueChangePercent >= 0 ? 'text-emerald-300' : 'text-red-400'}`}>
                {stats.revenueChangePercent >= 0 ? '+' : ''}{stats.revenueChangePercent.toFixed(2)}%
              </span>
            </div>
            <h2 className="text-xl font-semibold text-white">${stats.todayRevenue.toFixed(2)}</h2>
            <p className="text-sm text-stone-300/90">Total Revenue today</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-800 rounded-[10px] flex items-center justify-center">
                <img src="/totalOrders.png" alt="orders" className="w-7 h-7" />
              </div>
              <span className={`ml-2 text-base font-medium ${stats.ordersChangePercent >= 0 ? 'text-emerald-300' : 'text-red-400'}`}>
                {stats.ordersChangePercent >= 0 ? '+' : ''}{stats.ordersChangePercent.toFixed(2)}%
              </span>
            </div>
            <h2 className="text-xl font-semibold text-white">{stats.todayOrders}</h2>
            <p className="text-sm text-stone-300/90">Total Ordered today</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-800 rounded-[10px] flex items-center justify-center">
                <img src="/reservationTodayIcon.png" alt="reservations" className="w-7 h-7" />
              </div>
              <span className={`ml-2 text-base font-medium ${stats.reservationsChangePercent >= 0 ? 'text-emerald-300' : 'text-red-400'}`}>
                {stats.reservationsChangePercent >= 0 ? '+' : ''}{stats.reservationsChangePercent.toFixed(2)}%
              </span>
            </div>
            <h2 className="text-xl font-semibold text-white">{stats.todayReservations}</h2>
            <p className="text-sm text-stone-300/90">Reservation today</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-800 rounded-[10px] flex items-center justify-center">
                <img src="/reservationTodayIcon.png" alt="staff" className="w-7 h-7" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white">{stats.activeStaff}</h2>
            <p className="text-sm text-stone-300/90">Active Staff</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Order Report</h2>
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="px-4 py-2 bg-neutral-900 hover:cursor-pointer rounded-[10px] border border-white text-sm focus:outline-none focus:border-orange-400"
              >
                <option value="ALL">All Orders</option>
                <option value="PENDING">Pending</option>
                <option value="PREPARING">Preparing</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>Customer</div>
              <div className="text-center">Menu</div>
              <div className="text-center">Total Payment</div>
              <div className="text-center">Status</div>
            </div>
            <div className="space-y-4 mt-2">
              {filteredOrders.map((order) => {
                const customerImages = ['/cus1.png', '/cus2.png', '/cus3.png'];
                const randomImg = customerImages[Math.floor(Math.random() * customerImages.length)];
                return (
                  <div key={order.id} className="grid grid-cols-4 gap-4 items-center">
                    <div className="flex items-center">
                      <img src={randomImg} alt="customer" className="w-10 h-10 rounded-full mr-2" />
                      <span>{order.customerName}</span>
                    </div>
                    <div className="text-center">
                      {order.items.map((item, idx) => (
                        <div key={idx}>{item.itemName}</div>
                      ))}
                    </div>
                    <div className="text-center">
                      <span>${order.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="text-center">
                      <span
                        className={`px-4 py-1 rounded-3xl text-[10px] ${
                          order.status === 'COMPLETED'
                            ? 'bg-gray-700 text-green-300'
                            : order.status === 'PREPARING'
                            ? 'bg-slate-700 text-purple-300'
                            : 'bg-stone-700 text-rose-400'
                        }`}
                      >
                        {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                      </span>
                    </div>
                  </div>
                );
              })}
              {filteredOrders.length === 0 && (
                <div className="text-center py-4 text-gray-400">
                  No orders found for the selected status
                </div>
              )}
            </div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Most Ordered</h2>
              <select className="px-4 py-2 bg-neutral-900 rounded-[10px] border border-stone-300">
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                {bestsellers.map((item, index) => (
                  <div key={index} className="flex items-center p-4 bg-neutral-800 rounded-lg">
                    <img  src={item.imageFilename ? `http://localhost:8080/api/uploads/images/${item.imageFilename}` : '/apple.jpeg'}
                      alt={item.itemName}
                         className="w-16 h-16 rounded-full mr-4 object-cover" />
                    <div>
                      <h3 className="font-medium text-white">{item.itemName}</h3>
                      <p className="text-stone-300/90 text-sm">{item.totalSold} dish ordered</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <div className="w-48 h-48 relative">
                  <Doughnut
                    data={{
                      labels: bestsellers.map(item => item.itemName),
                      datasets: [{
                        data: bestsellers.map(item => item.totalSold),
                        backgroundColor: [
                          '#36A2EB',
                          '#FF6384',
                          '#4BC0C0',
                          '#FFCE56',
                          '#E7E9ED'
                        ],
                        borderWidth: 0,
                        cutout: '70%'
                      }]
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: false
                        }
                      },
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </div>
            </div>
            <button className="w-full mt-6 px-4 py-2 hover:cursor-pointer  bg-orange-400 rounded-[10px] text-center">
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;