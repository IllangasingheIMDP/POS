import React, { useState, useEffect } from 'react';
import api from '../../constants/api';

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [tableSize, setTableSize] = useState('');
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetchReservations();
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await api.get('/tables');
      setTables(response.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await api.get('/reservations');
      setReservations(response.data);
      setFilteredReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const handleSearch = () => {
    const filtered = reservations.filter((res) => {
      const resDate = new Date(res.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      if (start && resDate < start) return false;
      if (end && resDate > end) return false;
      if (timeSlot && res.time.substring(0, 5) !== timeSlot) return false;
      if (tableSize && res.numberOfGuests !== parseInt(tableSize)) return false;
      return true;
    });
    setFilteredReservations(filtered);
  };

  const formatDate = (dateStr) => {
    return dateStr.replace(/-/g, '.');
  };

  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(':');
    const hourInt = parseInt(hour);
    const ampm = hourInt >= 12 ? 'PM' : 'AM';
    const hour12 = hourInt % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  return (
     <div className='flex min-h-screen w-full bg-gradient-to-br from-[#0B161A] to-[#1a2428] p-8'>
      <div className="flex-1 bg-[#141E20] rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
        <div className="flex-col justify-between items-center mb-6">
          <h1 className="text-white text-4xl font-semibold px-2">Reservations</h1>
          <hr className='w-full border-t-2 mt-2 border-orange-400' />
        </div>

        {/* Filter Section */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <label className="text-white text-sm mb-2 font-medium">Date Range</label>
            <div className="flex w-[80%] items-center space-x-1">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-orange-400 border border-orange-400 rounded-lg p-2 text-white text-xs w-fit focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Start Date"
              />
              <span className="text-orange-400">-</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-orange-400 border border-orange-400 rounded-lg p-2 text-white text-sm w-fit focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="End Date"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-white text-sm mb-2 font-medium">Time Slot</label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="bg-zinc-800 border border-orange-400 rounded-lg p-2 text-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select time slot</option>
              <option value="12:00">12:00 PM</option>
              <option value="13:00">1:00 PM</option>
              <option value="19:00">7:00 PM</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-white text-sm mb-2 font-medium">Table Size</label>
            <select
              value={tableSize}
              onChange={(e) => setTableSize(e.target.value)}
              className="bg-zinc-800 border border-orange-400 rounded-lg p-2 text-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select table size</option>
              <option value="2">2 guests</option>
              <option value="4">4 guests</option>
              <option value="6">6 guests</option>
            </select>
          </div>
          <div className="flex flex-col justify-end">
            <button
              onClick={handleSearch}
              className="bg-orange-400 hover:cursor-pointer hover:bg-orange-500 text-white rounded-lg p-2 text-sm font-medium transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </div>

        {/* Reservations Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-white border-collapse">
            <thead>
              <tr className="bg-zinc-800">
                <th className="border-b border-orange-400 p-3 text-sm font-medium text-left">ID</th>
                <th className="border-b border-orange-400 p-3 text-sm font-medium text-left">Customer Name</th>
                <th className="border-b border-orange-400 p-3 text-sm font-medium text-left">Date & Time</th>
                <th className="border-b border-orange-400 p-3 text-sm font-medium text-left">Table</th>
                <th className="border-b border-orange-400 p-3 text-sm font-medium text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((res) => (
                <tr key={res.id} className="hover:bg-zinc-800">
                  <td className="p-3 text-sm">#{res.id}</td>
                  <td className="p-3 text-sm">{res.customerName}</td>
                  <td className="p-3 text-sm">
                    <div>{formatDate(res.date)}</div>
                    <div className="text-gray-400">{formatTime(res.time)}</div>
                  </td>
                  <td className="p-3 text-sm">Table {res.tableNumber}</td>
                  <td className="p-3 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      res.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-400' :
                      res.status === 'PENDING' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {res.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tables Status Section */}
        <div className="mt-8">
          <h2 className="text-white text-lg font-semibold mb-4">Tables Status</h2>
          <div className="grid grid-cols-4 gap-4">
            {tables.map((table) => (
              <div
                key={table.id}
                className="bg-zinc-800 p-4 rounded-lg border border-orange-400"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-medium">Table {table.tableNumber}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    table.status === 'AVAILABLE' ? 'bg-green-500/20 text-green-400' :
                    table.status === 'OCCUPIED' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {table.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-2">Capacity: {table.capacity} guests</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;