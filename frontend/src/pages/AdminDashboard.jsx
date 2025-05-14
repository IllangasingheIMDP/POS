import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import api from '../constants/api';
const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Get today's date in a readable format
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);

  // Loading and error states
  if (loading) {
    return <div className="flex h-screen bg-neutral-900 text-white items-center justify-center">Loading...</div>;
  }
  if (error) {
    return <div className="flex h-screen bg-neutral-900 text-white items-center justify-center">Error: {error}</div>;
  }

  const { stats, recentOrders, bestsellers } = dashboardData;

  return (
    <div className="flex h-screen bg-neutral-900 text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-white font-pathway">Dashboard</h1>
            <p className="text-lg text-stone-300/90 font-inter">{formattedDate}</p>
          </div>
          <div className="flex space-x-4">
            
            <button className="p-2 bg-stone-700 rounded-[10px]">
              <img src="/adminprofile.jpg" alt="profile" className="w-7 h-7" />
            </button>
          </div>
        </div>
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
            <h2 className="text-2xl font-semibold mb-4">Order Report</h2>
            <button className="mb-4 px-4 py-2 bg-neutral-900 rounded-[10px] border border-white">
              Filter Order
            </button>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>Customer</div>
              <div className="text-center">Menu</div>
              <div className="text-center">Total Payment</div>
              <div className="text-center">Status</div>
            </div>
            <div className="space-y-4 mt-2">
              {recentOrders.map((order) => {
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
              )
})}
            </div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Most Ordered</h2>
            <button className="mb-4 px-4 py-2 bg-neutral-900 rounded-[10px] border border-stone-300">
              Today
            </button>
            <div className="space-y-4">
              {bestsellers.map((item, index) => (
                <div key={index} className="flex items-center">
                  <img src={`${item.itemImage}`} alt={item.itemName} className="w-16 h-16 rounded mr-2" />
                  <div>
                    <span>{item.itemName}</span>
                    <p className="text-stone-300/90">{item.totalSold} dish ordered</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 px-4 py-2 bg-orange-400 rounded-[10px]">View All</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;