import React, { useState, useEffect } from 'react';
import api from '../../constants/api';

const BillingManage = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [filterType, setFilterType] = useState('all'); // 'all', 'date', 'id'
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    filterInvoices();
  }, [searchTerm, filterType, invoices, dateRange]);

  const fetchInvoices = async () => {
    try {
      const response = await api.get('/invoices');
      console.log('Invoices:', response.data);
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const calculateTotals = () => {
    const totalInvoices = invoices.length;
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const monthlyInvoices = invoices.filter(invoice => {
      const invoiceDate = new Date(invoice.issuedAt);
      return invoiceDate.getMonth() === currentMonth && 
             invoiceDate.getFullYear() === currentYear;
    });

    const monthlyTotal = monthlyInvoices.reduce((sum, invoice) => 
      sum + invoice.totalAmount, 0
    );

    // Calculate percentage change from previous month
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const lastMonthInvoices = invoices.filter(invoice => {
      const invoiceDate = new Date(invoice.issuedAt);
      return invoiceDate.getMonth() === lastMonth && 
             invoiceDate.getFullYear() === lastMonthYear;
    });

    const lastMonthTotal = lastMonthInvoices.reduce((sum, invoice) => 
      sum + invoice.totalAmount, 0
    );

    const percentageChange = lastMonthTotal === 0 ? 0 : 
      ((monthlyTotal - lastMonthTotal) / lastMonthTotal) * 100;

    return { totalInvoices, monthlyTotal, percentageChange };
  };

  const filterInvoices = () => {
    let result = invoices;

    if (filterType === 'id' && searchTerm) {
      result = result.filter(invoice =>
        invoice.id.toString().includes(searchTerm)
      );
    }

    if (filterType === 'date' && dateRange.start && dateRange.end) {
      result = result.filter(invoice => {
        const invoiceDate = new Date(invoice.issuedAt);
        return invoiceDate >= new Date(dateRange.start) && 
               invoiceDate <= new Date(dateRange.end);
      });
    }

    setFilteredInvoices(result);
  };

  const handleGenerateInvoice = async (orderId, paymentId) => {
    try {
      const response = await api.post('/invoices', { orderId, paymentId });
      setInvoices([...invoices, response.data]);
    } catch (error) {
      console.error('Error generating invoice:', error);
    }
  };

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-500/20 text-green-400';
      case 'IN_PROGRESS': return 'bg-blue-500/20 text-blue-400';
      case 'PENDING': return 'bg-orange-500/20 text-orange-400';
      case 'CANCELLED': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const { totalInvoices, monthlyTotal, percentageChange } = calculateTotals();

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-[#0B161A] to-[#1a2428] p-8">
      <div className="flex-1 bg-[#141E20] rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-8">
            <div className="bg-[#1d2b2f] p-6 rounded-xl">
              <h1 className="text-2xl font-semibold text-gray-400">Total Invoices</h1>
              <p className="text-4xl font-bold text-white mt-2">{totalInvoices}</p>
            </div>
            <div className="bg-[#1d2b2f] p-6 rounded-xl">
              <h1 className="text-2xl font-semibold text-gray-400">Monthly Income</h1>
              <p className="text-4xl font-bold text-white mt-2">
                LKR {monthlyTotal.toLocaleString()}
              </p>
              <div className={`flex items-center mt-2 ${
                percentageChange >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                <span className="text-sm">
                  {percentageChange >= 0 ? '↑' : '↓'} {Math.abs(percentageChange).toFixed(2)}%
                </span>
                <span className="text-xs ml-1">vs last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder={filterType === 'id' ? "Search by Invoice ID" : "Select filter type"}
                className="w-64 px-4 py-2 bg-[#1d2b2f] text-white rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={filterType !== 'id'}
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilterType('id')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterType === 'id' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-[#1d2b2f] text-gray-400 hover:bg-[#2d3b3f]'
                }`}
              >
                Filter by ID
              </button>
              <button
                onClick={() => {
                  setFilterType('date');
                  setShowDateFilter(true);
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterType === 'date'
                    ? 'bg-orange-500 text-white'
                    : 'bg-[#1d2b2f] text-gray-400 hover:bg-[#2d3b3f]'
                }`}
              >
                Filter by Date
              </button>
            </div>
          </div>
        </div>

        {/* Date Filter Modal */}
        {showDateFilter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1d2b2f] p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">Select Date Range</h3>
                <button 
                  onClick={() => setShowDateFilter(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    className="w-full bg-[#141E20] text-white rounded-lg p-3 border border-gray-700 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">End Date</label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    className="w-full bg-[#141E20] text-white rounded-lg p-3 border border-gray-700 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => {
                    filterInvoices();
                    setShowDateFilter(false);
                  }}
                  className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Invoice Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-lg font-bold font-['Inter'] text-white">
            <thead>
              <tr className="border-b border-orange-400/60">
                <th className="p-2">Select</th>
                <th className="p-2">Invoice ID</th>
                <th className="p-2">Date & Time</th>
                <th className="p-2">Customer Name</th>
                <th className="p-2">Order Status</th>
                <th className="p-2">Order Total</th>
                <th className="p-2">Invoice Amount</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-orange-400/60">
                  <td className="p-2"><input type="checkbox" className="w-3 h-3 bg-white" /></td>
                  <td className="p-2">{`#INV-${invoice.id}`}</td>
                  <td className="p-2">{formatDateTime(invoice.issuedAt)}</td>
                  <td className="p-2 flex items-center">
                    <div className="w-8 h-8 mr-2 bg-orange-400/20 rounded-full flex items-center justify-center">
                      <span className="text-orange-400">
                        {invoice.customerName?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                    </div>
                    {invoice.customerName}
                  </td>
                  <td className="p-2">
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(invoice.orderStatus)}`}>
                      {invoice.orderStatus}
                    </span>
                  </td>
                  <td className="p-2">
                    LKR {invoice.orderTotalPrice.toLocaleString()}
                  </td>
                  <td className="p-2">
                    LKR {invoice.totalAmount.toLocaleString()}
                  </td>
                  <td className="p-2">
                    <button className="px-4 py-2 bg-orange-400 rounded-lg text-white hover:bg-orange-500 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingManage;