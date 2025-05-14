import React from 'react';
import Sidebar from '../components/sidebar';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-neutral-900 text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-white/20 font-pathway">Dashboard</h1>
            <p className="text-lg text-stone-300/90 font-inter">Wednesday, May 14, 2025</p>
          </div>
          <div className="flex space-x-4">
            <button className="p-2 bg-stone-700 rounded-[10px]">
              <img src="https://placehold.co/30x30" alt="bell" className="w-7 h-7" />
            </button>
            <button className="p-2 bg-stone-700 rounded-[10px]">
              <img src="https://placehold.co/40x40" alt="profile" className="w-7 h-7" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-zinc-900 p-4 rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-800 rounded-[10px] flex items-center justify-center">
                <img src="https://placehold.co/27x27" alt="revenue" className="w-7 h-7" />
              </div>
              <span className="ml-2 text-emerald-300 text-base font-medium">+30.25%</span>
            </div>
            <h2 className="text-xl font-semibold text-white/20">$8,500.00</h2>
            <p className="text-sm text-stone-300/90">Total Revenue today</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-800 rounded-[10px] flex items-center justify-center">
                <img src="https://placehold.co/28x30" alt="orders" className="w-7 h-7" />
              </div>
              <span className="ml-2 text-stone-500 text-base font-medium">-10.40%</span>
            </div>
            <h2 className="text-xl font-semibold text-white/20">15</h2>
            <p className="text-sm text-stone-300/90">Total Ordered today</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-800 rounded-[10px] flex items-center justify-center">
                <img src="https://placehold.co/27x27" alt="reservations" className="w-7 h-7" />
              </div>
              <span className="ml-2 text-slate-500 text-base font-medium">+5.25%</span>
            </div>
            <h2 className="text-xl font-semibold text-white/20">1285</h2>
            <p className="text-sm text-stone-300/90">Reservation today</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-800 rounded-[10px] flex items-center justify-center">
                <img src="https://placehold.co/27x27" alt="staff" className="w-7 h-7" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white/20">5</h2>
            <p className="text-sm text-stone-300/90">Active Staff</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Order Report</h2>
            <button className="mb-4 px-4 py-2 bg-neutral-900 rounded-[10px] border border-white">
              Filter Order
            </button>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>Customer</div>
              <div className="text-center">Menu</div>
              <div className="text-center">Total Payment</div>
              <div className="text-center">Status</div>
            </div>
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="flex items-center">
                  <img src="https://placehold.co/40x40" alt="customer" className="w-10 h-10 rounded-full mr-2" />
                  <span>Alexandra Allan</span>
                </div>
                <span>Traditional Rice & Curry (Vegetables only)</span>
                <div className="flex items-center">
                  <span>$195</span>
                  <span className="ml-2 px-4 py-1 bg-gray-700 rounded-3xl text-green-300 text-[10px]">Completed</span>
                </div>
              </div>
              {/* Add more order items similarly */}
            </div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Most Ordered</h2>
            <button className="mb-4 px-4 py-2 bg-neutral-900 rounded-[10px] border border-stone-300">
              Today
            </button>
            <div className="space-y-4">
              <div className="flex items-center">
                <img src="https://placehold.co/50x50" alt="dish" className="w-16 h-16 rounded mr-2" />
                <div>
                  <span>Chicken Shawarma with Potatoes</span>
                  <p className="text-stone-300/90">200 dish ordered</p>
                </div>
              </div>
              {/* Add more most ordered items similarly */}
            </div>
            <button className="mt-4 px-4 py-2 bg-orange-400 rounded-[10px]">View All</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;