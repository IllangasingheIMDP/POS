import React, { useState, useEffect } from 'react';
import api from '../../constants/api';

const CashierReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [tableSize, setTableSize] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tables, setTables] = useState([]);
  const [showTableModal, setShowTableModal] = useState(false);
  const [newTable, setNewTable] = useState({
    tableNumber: '',
    capacity: '',
    status: 'AVAILABLE'
  });

  const [newReservation, setNewReservation] = useState({
    customerName: '',
    contactNumber: '',
    date: '',
    time: '',
    numberOfGuests: 0,
    tableNumber: 0,
    status: 'PENDING',
  });

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
  const handleReservationStatusChange = async (reservationId, newStatus) => {
    try {
      await api.put(`/reservations/${reservationId}/status`, { status: newStatus });
      fetchReservations(); // Refresh the list
    } catch (error) {
      console.error('Error updating reservation status:', error);
    }
  };

  const handleTableStatusChange = async (tableId, newStatus) => {
    try {
      await api.put(`/tables/${tableId}/status`, { status: newStatus });
      fetchTables(); // Refresh the list
    } catch (error) {
      console.error('Error updating table status:', error);
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

  const handleAddReservation = async () => {
    try {
      const response = await api.post('/reservations', newReservation);
      setReservations([...reservations, response.data]);
      setFilteredReservations([...filteredReservations, response.data]);
      setShowModal(false);
      setNewReservation({
        customerName: '',
        contactNumber: '',
        date: '',
        time: '',
        numberOfGuests: 0,
        tableNumber: 0,
        status: 'PENDING',
      });
    } catch (error) {
      console.error('Error adding reservation:', error);
    }
  };

  const handleAddTable = async () => {
    try {
      const response = await api.post('/tables', newTable);
      setTables([...tables, response.data]);
      setShowTableModal(false);
      setNewTable({
        tableNumber: '',
        capacity: '',
        status: 'AVAILABLE'
      });
    } catch (error) {
      console.error('Error adding table:', error);
    }
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
    <div className="menu-page w-full flex min-h-screen h-auto p-8 bg-[#0B161A] text-white">
      <div className="w-full h-fit relative bg-[#141E20] rounded-2xl p-8 font-['Inter']">
        <div className="flex-col justify-between items-center mb-8">
          <h1 className="text-white text-3xl font-semibold">Reservation Management</h1>
          <hr className='w-full border-t-2 mt-2 border-orange-400' />
        </div>
        {/* Filter Section */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <label className="text-white text-sm mb-2 font-medium">Date Range</label>
            <div className="flex space-x-2 items-center">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-orange-400 border border-orange-400 rounded-lg p-2 text-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Start Date"
              />
              <span className="text-orange-400">-</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-orange-400 border border-orange-400 rounded-lg p-2 text-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
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
              className="bg-orange-400  hover:cursor-pointer hover:bg-orange-500 text-white rounded-lg p-2 text-sm font-medium transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </div>

        {/* Table Section */}
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
                    <select
                      value={res.status}
                      onChange={(e) => handleReservationStatusChange(res.id, e.target.value)}
                      className="bg-zinc-800 border border-orange-400 rounded-lg p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Reservation Button */}
        <div className="mt-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-400  hover:cursor-pointer hover:bg-orange-500 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
          >
            Add New Reservation
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-zinc-900 p-6 rounded-lg w-96 max-w-md">
              <h2 className="text-white text-lg font-semibold mb-4">Add New Reservation</h2>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="customerName" className="text-white text-sm font-medium">
                    Customer Name
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    value={newReservation.customerName}
                    onChange={(e) => setNewReservation({ ...newReservation, customerName: e.target.value })}
                    className="bg-zinc-800 border border-orange-400 rounded-lg p-2 w-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="contactNumber" className="text-white text-sm font-medium">
                    Contact Number
                  </label>
                  <input
                    id="contactNumber"
                    type="text"
                    value={newReservation.contactNumber}
                    onChange={(e) => setNewReservation({ ...newReservation, contactNumber: e.target.value })}
                    className="bg-zinc-800 border border-orange-400 rounded-lg p-2 w-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="date" className="text-white text-sm font-medium">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={newReservation.date}
                    onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })}
                    className="bg-zinc-800 border border-orange-400 rounded-lg p-2 w-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="time" className="text-white text-sm font-medium">
                    Time
                  </label>
                  <input
                    id="time"
                    type="time"
                    value={newReservation.time}
                    onChange={(e) => setNewReservation({ ...newReservation, time: e.target.value })}
                    className="bg-zinc-800 border border-orange-400 rounded-lg p-2 w-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="numberOfGuests" className="text-white text-sm font-medium">
                    Number of Guests
                  </label>
                  <input
                    id="numberOfGuests"
                    type="number"
                    value={newReservation.numberOfGuests}
                    onChange={(e) => setNewReservation({
                      ...newReservation,
                      numberOfGuests: parseInt(e.target.value) || 0,
                    })}
                    className="bg-zinc-800 border border-orange-400 rounded-lg p-2 w-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

        
                <div className="flex flex-col gap-1">
                  <label htmlFor="tableNumber" className="text-white text-sm font-medium">
                    Table Number
                  </label>
                  <select
                    id="tableNumber"
                    value={newReservation.tableNumber}
                    onChange={(e) => setNewReservation({
                      ...newReservation,
                      tableNumber: parseInt(e.target.value)
                    })}
                    className="bg-zinc-800 border border-orange-400 rounded-lg p-2 w-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  >
                    <option value="">Select Table</option>
                    {tables
                      .filter(table => table.status === 'AVAILABLE')
                      .map(table => (
                        <option key={table.id} value={table.tableNumber}>
                          Table {table.tableNumber} (Capacity: {table.capacity})
                        </option>
                      ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="status" className="text-white text-sm font-medium">
                    Status
                  </label>
                  <select
                    id="status"
                    value={newReservation.status}
                    onChange={(e) => setNewReservation({ ...newReservation, status: e.target.value })}
                    className="bg-zinc-800 border border-orange-400 rounded-lg p-2 w-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-zinc-700 hover:cursor-pointer hover:bg-zinc-600 text-white rounded-lg px-4 py-2 text-sm transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddReservation}
                    className="bg-orange-400 hover:bg-orange-500 text-white rounded-lg px-4 py-2 text-sm transition-colors duration-200"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Add New Table Button */}
        <div className="mt-8 flex justify-between items-center">
          <h2 className="text-white text-lg font-semibold">Tables Status</h2>
          <button
            onClick={() => setShowTableModal(true)}
            className="bg-orange-400 hover:cursor-pointer hover:bg-orange-500 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
          >
            Add New Table
          </button>
        </div>
        {/* Tables Section */}
        <div className="mt-8">
          <div className="grid grid-cols-4 gap-4">
            {tables.map((table) => (
              <div
                key={table.id}
                className="bg-zinc-800 p-4 rounded-lg border border-orange-400"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-medium">Table {table.tableNumber}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${table.status === 'AVAILABLE' ? 'bg-green-500/20 text-green-400' :
                      table.status === 'OCCUPIED' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                    }`}>
                    {table.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">Capacity: {table.capacity} guests</p>
                <select
                  value={table.status}
                  onChange={(e) => handleTableStatusChange(table.id, e.target.value)}
                  className="bg-zinc-900 border border-orange-400 rounded-lg p-2 text-sm text-white w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="OCCUPIED">Occupied</option>
                  <option value="RESERVED">Reserved</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Add New Table Modal */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#1d2b2f] p-6 rounded-xl w-96">
            <h2 className="text-xl font-semibold text-white mb-6">Add New Table</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Table Number</label>
                <input
                  type="number"
                  value={newTable.tableNumber}
                  onChange={(e) => setNewTable({ ...newTable, tableNumber: parseInt(e.target.value) })}
                  className="w-full bg-[#141E20] text-white rounded-lg p-3 border border-gray-700 focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2 text-sm">Capacity</label>
                <input
                  type="number"
                  value={newTable.capacity}
                  onChange={(e) => setNewTable({ ...newTable, capacity: parseInt(e.target.value) })}
                  className="w-full bg-[#141E20] text-white rounded-lg p-3 border border-gray-700 focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2 text-sm">Status</label>
                <select
                  value={newTable.status}
                  onChange={(e) => setNewTable({ ...newTable, status: e.target.value })}
                  className="w-full bg-[#141E20] text-white rounded-lg p-3 border border-gray-700 focus:border-orange-500 focus:outline-none"
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="OCCUPIED">Occupied</option>
                  <option value="RESERVED">Reserved</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowTableModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTable}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                >
                  Add Table
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashierReservation;