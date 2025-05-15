import React, { useState, useEffect } from 'react';
import api from '../../constants/api';
import { FiDownload, FiSearch, FiCalendar } from 'react-icons/fi'; // Add react-icons

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
    const handleExport = () => {
        const headers = [
            'Invoice ID',
            'Date & Time',
            'Customer',
            'Status',
            'Order Total',
            'Amount'
        ];

        const rows = filteredInvoices.map(invoice => [
            `#${invoice.id.toString().padStart(4, '0')}`,
            formatDateTime(invoice.issuedAt),
            invoice.customerName || 'N/A',
            invoice.orderStatus,
            `LKR ${invoice.orderTotalPrice.toLocaleString()}`,
            `LKR ${invoice.totalAmount.toLocaleString()}`
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `invoices_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <div className="flex min-h-screen w-full bg-gradient-to-br from-[#0B161A] to-[#1a2428] p-8">
            <div className="flex-1 bg-[#141E20] rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
                {/* Header Stats Section */}
                 <div className="flex-col justify-between items-center mb-6">
          <h1 className="text-white text-4xl px-2 font-semibold">Invoices</h1>
          <hr className='w-full border-t-2 mt-2 border-orange-400' />
        </div>

                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-[#1d2b2f] p-6 rounded-xl hover:shadow-lg transition-all duration-300">
                        <h2 className="text-base font-medium text-gray-400">Total Invoices</h2>
                        <p className="text-3xl font-bold text-white mt-2">{totalInvoices}</p>
                        <p className="text-sm text-gray-500 mt-1">All time records</p>
                    </div>

                    <div className="bg-[#1d2b2f] p-6 rounded-xl col-span-2 hover:shadow-lg transition-all duration-300">
                        <h2 className="text-base font-medium text-gray-400">Monthly Revenue</h2>
                        <div className="flex items-end justify-between">
                            <p className="text-3xl font-bold text-white mt-2">
                                LKR {monthlyTotal.toLocaleString()}
                            </p>
                            <div className={`flex items-center ${percentageChange >= 0 ? 'text-green-400' : 'text-red-400'
                                }`}>
                                <span className="text-2xl font-semibold">
                                    {percentageChange >= 0 ? '↑' : '↓'} {Math.abs(percentageChange).toFixed(1)}%
                                </span>
                                <span className="text-sm text-gray-400 ml-2">vs last month</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="flex justify-between items-center mb-6 bg-[#1d2b2f] p-4 rounded-xl">
                    <div className="flex space-x-4 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by Invoice ID..."
                                className="w-full pl-10 pr-4 py-2 bg-[#141E20] text-white rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none text-sm"
                                value={searchTerm}
                                onChange={(e) => {
                                    setFilterType('id'); // Automatically set filter type to 'id' when typing
                                    setSearchTerm(e.target.value);
                                }}
                            />
                        </div>
                        <button
                            onClick={() => {
                                setFilterType('date');
                                setShowDateFilter(true);
                            }}
                            className="flex items-center space-x-2 px-4 py-2 bg-[#141E20] text-gray-400 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300"
                        >
                            <FiCalendar />
                            <span className="text-sm">Date Filter</span>
                        </button>
                    </div>
                    <button
                        onClick={handleExport}
                        className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
                    >
                        <FiDownload />
                        <span className="text-sm">Export</span>
                    </button>
                </div>
                {showDateFilter && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
                        <div className="bg-[#1d2b2f] w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-semibold text-white">Filter by Date</h3>
                                <button
                                    onClick={() => setShowDateFilter(false)}
                                    className="text-gray-400 hover:text-white text-xl transition"
                                    aria-label="Close"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">Start Date</label>
                                    <input
                                        type="date"
                                        value={dateRange.start}
                                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                                        className="w-full bg-orange-200 text-[#141E20] p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">End Date</label>
                                    <input
                                        type="date"
                                        value={dateRange.end}
                                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                                        className="w-full bg-orange-200 text-[#141E20] p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                    />
                                </div>

                                <button
                                    onClick={() => {
                                        filterInvoices();
                                        setShowDateFilter(false);
                                    }}
                                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200 shadow-md"
                                >
                                    Apply Filter
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Invoice Table */}
                <div className="bg-[#1d2b2f] rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-700/50">
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Invoice</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date & Time</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Order Total</th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/50">
                            {filteredInvoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-gray-800/30 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                        #{invoice.id.toString().padStart(4, '0')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {formatDateTime(invoice.issuedAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-medium text-orange-400">
                                                    {invoice.customerName?.charAt(0)?.toUpperCase() || '?'}
                                                </span>
                                            </div>
                                            <span className="ml-3 text-sm text-gray-300">{invoice.customerName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.orderStatus)}`}>
                                            {invoice.orderStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-300">
                                        LKR {invoice.orderTotalPrice.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right text-white">
                                        LKR {invoice.totalAmount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <button className="text-xs bg-[#141E20] text-orange-400 px-3 py-1.5 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300">
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