// import { useEffect, useState } from "react";
// import API from "../services/api";
// import toast from "react-hot-toast";
// import { FaCalendarAlt, FaTable } from "react-icons/fa";

// import CalendarBookings from "./admin/Guest/CalendarBookings";
// import BookingsTable from "./admin/Guest/BookingsTable";

// export default function AdminGuests() {
//   const [bookings, setBookings] = useState([]);
//   const [viewMode, setViewMode] = useState("calendar");
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [search, setSearch] = useState("");

//   const fetchBookings = async () => {
//     try {
//       const res = await API.get("/bookings");
//       setBookings(res.data);
//     } catch {
//       toast.error("Failed to load bookings");
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Guest Details</h1>

//         <div className="flex gap-3">
//           <button
//             onClick={() => setViewMode("calendar")}
//             className={`p-2 rounded ${viewMode === "calendar" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//           >
//             <FaCalendarAlt />
//           </button>

//           <button
//             onClick={() => setViewMode("table")}
//             className={`p-2 rounded ${viewMode === "table" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//           >
//             <FaTable />
//           </button>
//         </div>
//       </div>

//       {/* Views */}
//       {viewMode === "calendar" ? (
//         <CalendarBookings
//           bookings={bookings}
//           selectedDate={selectedDate}
//           setSelectedDate={setSelectedDate}
//         />
//       ) : (
//         <BookingsTable
//           bookings={bookings}
//           search={search}
//           setSearch={setSearch}
//         />
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";
import toast from "react-hot-toast";
import { 
  FiCalendar, 
  FiTable, 
  FiUsers, 
  FiSearch,
  FiFilter,
  FiDownload,
  FiRefreshCw,
  FiUserCheck,
  FiUserX,
  FiClock,
  FiDollarSign
} from "react-icons/fi";

import CalendarBookings from "./admin/Guest/CalendarBookings";
import BookingsTable from "./admin/Guest/BookingsTable";

export default function AdminGuests() {
  const [bookings, setBookings] = useState([]);
  const [viewMode, setViewMode] = useState("calendar");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalGuests: 0,
    checkedIn: 0,
    checkedOut: 0,
    upcoming: 0,
    revenue: 0
  });

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await API.get("/bookings");
      setBookings(res.data);
      
      // Calculate stats
      const now = new Date();
      const today = new Date(now.setHours(0, 0, 0, 0));
      
      const checkedIn = res.data.filter(b => 
        new Date(b.checkInDate) <= today && new Date(b.checkOutDate) >= today
      ).length;
      
      const checkedOut = res.data.filter(b => 
        new Date(b.checkOutDate) < today
      ).length;
      
      const upcoming = res.data.filter(b => 
        new Date(b.checkInDate) > today
      ).length;
      
      const totalRevenue = res.data.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
      
      setStats({
        totalGuests: res.data.length,
        checkedIn,
        checkedOut,
        upcoming,
        revenue: totalRevenue
      });
      
    } catch (error) {
      toast.error("Failed to load bookings");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

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

  if (loading) {
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
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-light text-gray-900">
              Guest <span className="font-serif italic text-[#907B60]">Management</span>
            </h1>
            <p className="text-gray-500 mt-2">Comprehensive overview of all guest bookings and activities</p>
          </div>
          
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            {/* Refresh Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchBookings}
              className="p-3 bg-white border border-gray-200 rounded-xl hover:border-[#907B60] transition-all"
            >
              <FiRefreshCw className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#907B60]/10 rounded-xl">
                <FiUsers className="w-5 h-5 text-[#907B60]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Guests</p>
                <p className="text-xl font-bold text-gray-900">{stats.totalGuests}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <FiUserCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Checked In</p>
                <p className="text-xl font-bold text-gray-900">{stats.checkedIn}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-xl">
                <FiUserX className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Checked Out</p>
                <p className="text-xl font-bold text-gray-900">{stats.checkedOut}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiClock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Upcoming</p>
                <p className="text-xl font-bold text-gray-900">{stats.upcoming}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 rounded-xl">
                <FiDollarSign className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Revenue</p>
                <p className="text-xl font-bold text-gray-900">£{stats.revenue.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* View Toggle and Search */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search guests, rooms, emails..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-200">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("calendar")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                viewMode === "calendar" 
                  ? 'bg-gradient-to-r from-[#907B60] to-[#b89e84] text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiCalendar className="w-4 h-4" />
              <span className="hidden sm:inline">Calendar</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                viewMode === "table" 
                  ? 'bg-gradient-to-r from-[#907B60] to-[#b89e84] text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiTable className="w-4 h-4" />
              <span className="hidden sm:inline">Table</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Views */}
        <AnimatePresence mode="wait">
          {viewMode === "calendar" ? (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <CalendarBookings
                bookings={bookings}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BookingsTable
                bookings={bookings}
                search={search}
                setSearch={setSearch}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}