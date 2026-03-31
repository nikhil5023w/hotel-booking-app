import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api.js";
import toast from "react-hot-toast";
import ConfirmModal from "../Components/ConfirmModal.jsx";
import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiDownload,
  FiXCircle,
  FiHome,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
  FiAlertCircle,
  FiEye,
  FiFileText,
} from "react-icons/fi";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [filter, setFilter] = useState("all"); // all, upcoming, completed, cancelled

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const { data } = await API.get("/bookings/my");
      setBookings(data);
    } catch (error) {
      toast.error("Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Download invoice
  const downloadInvoice = async (bookingId) => {
    try {
      const response = await API.get(`/invoices/${bookingId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Invoice downloaded successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to download invoice",
      );
    }
  };

  const openCancelModal = (id) => {
    setSelectedBooking(id);
    setShowModal(true);
  };

  const cancelBooking = async () => {
    try {
      setLoadingId(selectedBooking);
      const res = await API.put(`/bookings/${selectedBooking}/cancel`);
      toast.success(res.data.message);
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Cancellation failed");
    } finally {
      setLoadingId(null);
      setShowModal(false);
    }
  };

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    const today = new Date();
    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);

    if (filter === "all") return true;
    if (filter === "upcoming")
      return checkIn > today && booking.status !== "cancelled";
    if (filter === "completed")
      return checkOut < today && booking.status !== "cancelled";
    if (filter === "cancelled") return booking.status === "cancelled";
    return true;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const getStatusColor = (status, checkIn, checkOut) => {
    if (status === "cancelled") return "bg-red-100 text-red-600";

    const today = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate <= today && checkOutDate >= today)
      return "bg-green-100 text-green-600";
    if (checkOutDate < today) return "bg-gray-100 text-gray-600";
    if (checkInDate > today) return "bg-blue-100 text-blue-600";

    return "bg-yellow-100 text-yellow-600";
  };

  const getStatusText = (status, checkIn, checkOut) => {
    if (status === "cancelled") return "Cancelled";

    const today = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate <= today && checkOutDate >= today) return "Active";
    if (checkOutDate < today) return "Completed";
    if (checkInDate > today) return "Upcoming";

    return status;
  };

  const getStatusIcon = (status, checkIn, checkOut) => {
    if (status === "cancelled") return <FiXCircle className="w-4 h-4" />;

    const today = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate <= today && checkOutDate >= today)
      return <FiCheckCircle className="w-4 h-4" />;
    if (checkOutDate < today) return <FiCheckCircle className="w-4 h-4" />;
    if (checkInDate > today) return <FiClock className="w-4 h-4" />;

    return <FiAlertCircle className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf7f2] via-white to-[#faf7f2] py-12 px-4">
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
            ease: "linear",
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
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#907B60]/5 to-transparent rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="my-8">
          <h1 className="text-4xl font-light text-gray-900">
            My{" "}
            <span className="font-serif italic text-[#907B60]">Bookings</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your reservations and view booking details
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            {
              label: "Total Bookings",
              value: bookings.length,
              icon: FiCalendar,
            },
            {
              label: "Upcoming",
              value: bookings.filter(
                (b) =>
                  new Date(b.checkInDate) > new Date() &&
                  b.status !== "cancelled",
              ).length,
              icon: FiClock,
            },
            {
              label: "Completed",
              value: bookings.filter(
                (b) =>
                  new Date(b.checkOutDate) < new Date() &&
                  b.status !== "cancelled",
              ).length,
              icon: FiCheckCircle,
            },
            {
              label: "Total Spent",
              value: `£${bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)}`,
              icon: FiDollarSign,
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -3 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className="w-10 h-10 bg-[#907B60]/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-[#907B60]" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          variants={itemVariants}
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
        >
          {["all", "upcoming", "completed", "cancelled"].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-xl capitalize whitespace-nowrap transition-all ${
                filter === filterOption
                  ? "bg-gradient-to-r from-[#907B60] to-[#b89e84] text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {filterOption}
            </button>
          ))}
        </motion.div>

        {/* Bookings List */}
        <motion.div variants={itemVariants} className="space-y-4">
          <AnimatePresence>
            {filteredBookings.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20"
              >
                <div className="w-20 h-20 bg-[#907B60]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCalendar className="w-8 h-8 text-[#907B60]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No bookings found
                </h3>
                <p className="text-gray-500">
                  Start planning your next stay with us
                </p>
                <button className="mt-6 px-6 py-3 bg-gradient-to-r from-[#907B60] to-[#b89e84] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
                  Browse Rooms
                </button>
              </motion.div>
            ) : (
              filteredBookings.map((booking) => (
                <motion.div
                  key={booking._id}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
                >
                  {/* Booking Header */}
                  <div
                    className="p-6 cursor-pointer hover:bg-gray-50/50 transition-colors"
                    onClick={() =>
                      setExpandedBooking(
                        expandedBooking === booking._id ? null : booking._id,
                      )
                    }
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        {/* Room Image Placeholder */}
                        <div className="w-16 h-16 bg-gradient-to-br from-[#907B60] to-[#b89e84] rounded-xl flex items-center justify-center text-white text-2xl font-serif">
                          {booking.room?.name?.charAt(0) || "R"}
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {booking.room?.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(booking.status, booking.checkInDate, booking.checkOutDate)}`}
                            >
                              {getStatusIcon(
                                booking.status,
                                booking.checkInDate,
                                booking.checkOutDate,
                              )}
                              {getStatusText(
                                booking.status,
                                booking.checkInDate,
                                booking.checkOutDate,
                              )}
                            </span>
                            <span className="text-sm text-gray-500">
                              Booking #{booking._id.slice(-6)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#907B60]">
                            £{booking.totalPrice}
                          </p>
                          <p className="text-xs text-gray-500">Total amount</p>
                        </div>
                        <motion.div
                          animate={{
                            rotate: expandedBooking === booking._id ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <FiClock className="w-5 h-5 text-gray-400" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedBooking === booking._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-100"
                      >
                        <div className="p-6 bg-gray-50/50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Booking Details */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-gray-900 mb-2">
                                Booking Details
                              </h4>

                              <div className="flex items-center gap-3 text-sm">
                                <FiCalendar className="w-4 h-4 text-[#907B60]" />
                                <div>
                                  <p className="text-gray-500">Check In</p>
                                  <p className="font-medium text-gray-900">
                                    {new Date(
                                      booking.checkInDate,
                                    ).toLocaleDateString("en-US", {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 text-sm">
                                <FiCalendar className="w-4 h-4 text-[#907B60]" />
                                <div>
                                  <p className="text-gray-500">Check Out</p>
                                  <p className="font-medium text-gray-900">
                                    {new Date(
                                      booking.checkOutDate,
                                    ).toLocaleDateString("en-US", {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 text-sm">
                                <FiClock className="w-4 h-4 text-[#907B60]" />
                                <div>
                                  <p className="text-gray-500">Duration</p>
                                  <p className="font-medium text-gray-900">
                                    {Math.ceil(
                                      (new Date(booking.checkOutDate) -
                                        new Date(booking.checkInDate)) /
                                        (1000 * 60 * 60 * 24),
                                    )}{" "}
                                    nights
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Guest Details */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-gray-900 mb-2">
                                Guest Details
                              </h4>

                              <div className="flex items-center gap-3 text-sm">
                                <FiUser className="w-4 h-4 text-[#907B60]" />
                                <div>
                                  <p className="text-gray-500">Name</p>
                                  <p className="font-medium text-gray-900">
                                    {booking.guestDetails?.fullName || "N/A"}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 text-sm">
                                <FiMail className="w-4 h-4 text-[#907B60]" />
                                <div>
                                  <p className="text-gray-500">Email</p>
                                  <p className="font-medium text-gray-900">
                                    {booking.guestDetails?.email || "N/A"}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 text-sm">
                                <FiPhone className="w-4 h-4 text-[#907B60]" />
                                <div>
                                  <p className="text-gray-500">Phone</p>
                                  <p className="font-medium text-gray-900">
                                    {booking.guestDetails?.phone || "N/A"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Price Breakdown */}
                          {/* Price Breakdown */}
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-3">
                              Price Breakdown
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">
                                  Room rate (
                                  {Math.ceil(
                                    (new Date(booking.checkOutDate) -
                                      new Date(booking.checkInDate)) /
                                      (1000 * 60 * 60 * 24),
                                  )}{" "}
                                  nights)
                                </span>
                                <span className="font-medium">
                                  £{booking.totalPrice}
                                </span>
                              </div>

                              <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold">
                                <span>Final Amount :</span>
                                <span className="text-[#907B60]">
                                  £{booking.totalPrice}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3 mt-6">
                            {booking.status === "confirmed" ? (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => downloadInvoice(booking._id)}
                                className="px-4 py-2 bg-[#907B60] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                              >
                                <FiDownload className="w-4 h-4" />
                                Download Invoice
                              </motion.button>
                            ) : (
                              <motion.button
                                disabled
                                className="px-4 py-2 bg-gray-300 text-gray-500 rounded-xl font-medium flex items-center gap-2 cursor-not-allowed"
                              >
                                <FiFileText className="w-4 h-4" />
                                Invoice Not Available
                              </motion.button>
                            )}

                            {booking.status !== "cancelled" && (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => openCancelModal(booking._id)}
                                disabled={loadingId === booking._id}
                                className="px-4 py-2 border border-red-200 text-red-500 rounded-xl font-medium hover:bg-red-50 transition-all flex items-center gap-2 disabled:opacity-50"
                              >
                                <FiXCircle className="w-4 h-4" />
                                {loadingId === booking._id
                                  ? "Cancelling..."
                                  : "Cancel Booking"}
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Cancel Confirmation Modal */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={cancelBooking}
        loading={loadingId !== null}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmText="Yes, Cancel"
        cancelText="No, Keep It"
      />
    </div>
  );
}
