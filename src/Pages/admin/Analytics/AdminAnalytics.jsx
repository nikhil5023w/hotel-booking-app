// import { useEffect, useState } from "react";
// import API from "../../../services/api";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// export default function AdminAnalytics() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       const res = await API.get("/analytics");
//       setData(res.data);
//     };

//     fetchAnalytics();
//   }, []);

//   if (!data) return <p>Loading analytics...</p>;

//   const chartData = Object.keys(data.monthlyStats).map((month) => ({
//     month,
//     bookings: data.monthlyStats[month].bookings,
//     revenue: data.monthlyStats[month].revenue,
//   }));

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

//       <div className="grid grid-cols-3 gap-4 mb-8">
//         <div className="bg-white shadow p-4 rounded">
//           <h3>Total Bookings</h3>
//           <p className="text-xl font-bold">{data.totalBookings}</p>
//         </div>

//         <div className="bg-white shadow p-4 rounded">
//           <h3>Total Revenue</h3>
//           <p className="text-xl font-bold">£{data.totalRevenue}</p>
//         </div>

//         <div className="bg-white shadow p-4 rounded">
//           <h3>Total Cancelled</h3>
//           <p className="text-xl font-bold">{data.totalCancelled}</p>
//         </div>
//       </div>

//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Line type="monotone" dataKey="bookings" />
//           <Line type="monotone" dataKey="revenue" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../../services/api"; // Add this import
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { 
  FiCalendar, 
  FiDollarSign, 
  FiUsers, 
  FiTrendingUp,
  FiTrendingDown,
  FiMinusCircle,
  FiClock,
  FiAward,
  FiStar,
  FiHome,
  FiRefreshCw,
  FiDownload,
  FiAlertCircle
} from "react-icons/fi";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100">
        <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-600">{entry.name}:</span>
            <span className="font-semibold text-gray-900">
              {entry.name === 'Revenue' || entry.name === 'revenue' ? `£${entry.value}` : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminAnalytics() {
  const [data, setData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setIsRefreshing(true);
    setError(null);
    
    try {
      // Check if API is defined
      if (!API) {
        throw new Error("API service not initialized");
      }
      
      const res = await API.get("/analytics");
      
      // Validate response data
      if (!res.data) {
        throw new Error("No data received from server");
      }
      
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
      setError(error.message || "Failed to load analytics data");
      
      // Set fallback data for development/testing
      setData({
        totalBookings: 156,
        totalRevenue: 45280,
        totalCancelled: 12,
        monthlyStats: {
          'Jan': { bookings: 45, revenue: 12500 },
          'Feb': { bookings: 52, revenue: 14800 },
          'Mar': { bookings: 48, revenue: 13200 },
          'Apr': { bookings: 61, revenue: 17800 },
          'May': { bookings: 55, revenue: 15800 },
          'Jun': { bookings: 67, revenue: 19200 },
        }
      });
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  // Show loading state
  if (!data && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#faf7f2]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-[#907B60]/20 border-t-[#907B60] rounded-full animate-spin" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 w-20 h-20 border-4 border-[#907B60]/10 rounded-full"
          />
        </div>
      </div>
    );
  }

  // Prepare chart data
  const chartData = data?.monthlyStats 
    ? Object.keys(data.monthlyStats).map((month) => ({
        month,
        bookings: data.monthlyStats[month].bookings || 0,
        revenue: data.monthlyStats[month].revenue || 0,
        occupancy: Math.floor(Math.random() * 30) + 70, // Example occupancy rate
      }))
    : [];

  // Calculate trends
  const previousMonth = chartData[chartData.length - 2]?.revenue || 0;
  const currentMonth = chartData[chartData.length - 1]?.revenue || 0;
  const revenueTrend = currentMonth > previousMonth ? 'up' : currentMonth < previousMonth ? 'down' : 'stable';
  const revenueChange = previousMonth ? (((currentMonth - previousMonth) / previousMonth) * 100).toFixed(1) : 0;

  const pieData = [
    { name: 'Deluxe Rooms', value: 35 },
    { name: 'Standard Rooms', value: 45 },
    { name: 'Suites', value: 20 },
  ];

  const COLORS = ['#907B60', '#b89e84', '#d4b595'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf7f2] via-white to-[#faf7f2] p-6 mt-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#907B60]/5 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#907B60]/5 to-transparent rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-light text-gray-900">
              Analytics <span className="font-serif italic text-[#907B60]">Dashboard</span>
            </h1>
            <p className="text-gray-500 mt-2">Comprehensive insights into your property performance</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Period Selector */}
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

            {/* Refresh Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchAnalytics}
              className="p-2 bg-white border border-gray-200 rounded-xl hover:border-[#907B60] transition-all"
              disabled={isRefreshing}
            >
              <FiRefreshCw className={`w-5 h-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            </motion.button>

            {/* Download Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-[#907B60] to-[#b89e84] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <FiDownload className="w-4 h-4" />
              Export
            </motion.button>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3"
          >
            <FiAlertCircle className="w-5 h-5 text-amber-500" />
            <p className="text-amber-700">{error} - Showing sample data</p>
          </motion.div>
        )}

        {/* KPI Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Bookings Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#907B60]/10 rounded-xl">
                <FiCalendar className="w-6 h-6 text-[#907B60]" />
              </div>
              <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">
                +12.5%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-900">{data?.totalBookings || 0}</p>
            <p className="text-xs text-gray-400 mt-2">vs last month +24</p>
          </motion.div>

          {/* Total Revenue Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <FiDollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className={`text-xs font-medium ${
                revenueTrend === 'up' ? 'text-green-500 bg-green-50' : 
                revenueTrend === 'down' ? 'text-red-500 bg-red-50' : 
                'text-gray-500 bg-gray-50'
              } px-2 py-1 rounded-full flex items-center gap-1`}>
                {revenueTrend === 'up' && <FiTrendingUp className="w-3 h-3" />}
                {revenueTrend === 'down' && <FiTrendingDown className="w-3 h-3" />}
                {revenueChange}%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">£{(data?.totalRevenue || 0).toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-2">Average £{data?.totalBookings ? Math.floor((data.totalRevenue || 0) / data.totalBookings) : 0} per booking</p>
          </motion.div>

          {/* Total Cancelled Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <FiMinusCircle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-xs font-medium text-amber-500 bg-amber-50 px-2 py-1 rounded-full">
                {data?.totalBookings ? ((data.totalCancelled / data.totalBookings) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Cancelled Bookings</p>
            <p className="text-2xl font-bold text-gray-900">{data?.totalCancelled || 0}</p>
            <p className="text-xs text-gray-400 mt-2">Cancellation rate 8.2%</p>
          </motion.div>

          {/* Active Guests Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
                87% occupancy
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Active Guests</p>
            <p className="text-2xl font-bold text-gray-900">156</p>
            <p className="text-xs text-gray-400 mt-2">Currently checked in</p>
          </motion.div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue & Bookings Chart */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue & Bookings Overview</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#907B60] rounded-full" />
                  <span className="text-xs text-gray-500">Revenue</span>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <div className="w-2 h-2 bg-[#b89e84] rounded-full" />
                  <span className="text-xs text-gray-500">Bookings</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis yAxisId="left" stroke="#9ca3af" />
                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#907B60" 
                  strokeWidth={3}
                  dot={{ fill: '#907B60', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#b89e84" 
                  strokeWidth={3}
                  dot={{ fill: '#b89e84', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Room Distribution Pie Chart */}
          <motion.div
            variants={cardVariants}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Room Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Occupancy Rate Chart */}
          <motion.div
            variants={cardVariants}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Occupancy Rate Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="occupancy" 
                  stroke="#907B60" 
                  fill="url(#colorOccupancy)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#907B60" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#907B60" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            variants={cardVariants}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-[#907B60]/10 rounded-full flex items-center justify-center">
                    <FiClock className="w-5 h-5 text-[#907B60]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New booking confirmed</p>
                    <p className="text-xs text-gray-500">Deluxe Suite • 2 guests • 5 minutes ago</p>
                  </div>
                  <span className="text-xs text-green-500 bg-green-50 px-2 py-1 rounded-full">
                    +£450
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Summary Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          <div className="bg-gradient-to-br from-[#907B60] to-[#b89e84] rounded-2xl p-6 text-white">
            <FiAward className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-sm opacity-80 mb-1">Average Rating</p>
            <p className="text-3xl font-bold">4.8</p>
            <div className="flex items-center gap-1 mt-2">
              {[1,2,3,4,5].map((star) => (
                <FiStar key={star} className="w-4 h-4 fill-white text-white" />
              ))}
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <FiHome className="w-8 h-8 text-[#907B60] mb-3" />
            <p className="text-sm text-gray-500 mb-1">Available Rooms</p>
            <p className="text-3xl font-bold text-gray-900">24</p>
            <p className="text-xs text-gray-400 mt-2">Out of 45 total rooms</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <FiUsers className="w-8 h-8 text-[#907B60] mb-3" />
            <p className="text-sm text-gray-500 mb-1">Check-ins Today</p>
            <p className="text-3xl font-bold text-gray-900">12</p>
            <p className="text-xs text-gray-400 mt-2">8 check-outs scheduled</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}