import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiHome,
  FiEye,
  FiDownload,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

export default function BookingsTable({ bookings, search, setSearch }) {
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortField, setSortField] = useState("checkInDate");
  const [sortDirection, setSortDirection] = useState("desc");

  const filteredBookings = bookings.filter((b) =>
    `${b.guestDetails?.fullName} ${b.room?.name} ${b.guestDetails?.email} ${b.guestDetails?.phone}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    let aVal, bVal;

    switch (sortField) {
      case "guestName":
        aVal = a.guestDetails?.fullName || "";
        bVal = b.guestDetails?.fullName || "";
        break;
      case "roomName":
        aVal = a.room?.name || "";
        bVal = b.room?.name || "";
        break;
      case "checkInDate":
        aVal = new Date(a.checkInDate);
        bVal = new Date(b.checkInDate);
        break;
      case "totalPrice":
        aVal = a.totalPrice || 0;
        bVal = b.totalPrice || 0;
        break;
      default:
        aVal = a[sortField];
        bVal = b[sortField];
    }

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getStatusColor = (booking) => {
    const today = new Date();
    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);

    if (checkIn <= today && checkOut >= today)
      return "bg-green-100 text-green-600";
    if (checkOut < today) return "bg-gray-100 text-gray-600";
    if (checkIn > today) return "bg-blue-100 text-blue-600";
    return "bg-amber-100 text-amber-600";
  };

  const getStatusText = (booking) => {
    const today = new Date();
    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);

    if (checkIn <= today && checkOut >= today) return "Checked In";
    if (checkOut < today) return "Checked Out";
    if (checkIn > today) return "Upcoming";
    return "Pending";
  };

  const downloadInvoice = async (bookingId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/invoice/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Invoice download failed:", error);
    }
  };
  const getStatusIcon = (booking) => {
    const status = getStatusText(booking);
    switch (status) {
      case "Checked In":
        return <FiCheckCircle className="w-4 h-4" />;
      case "Checked Out":
        return <FiXCircle className="w-4 h-4" />;
      case "Upcoming":
        return <FiClock className="w-4 h-4" />;
      default:
        return <FiClock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
          <div
            className="col-span-3 cursor-pointer hover:text-[#907B60]"
            onClick={() => handleSort("guestName")}
          >
            Guest Name{" "}
            {sortField === "guestName" && (sortDirection === "asc" ? "↑" : "↓")}
          </div>
          <div
            className="col-span-2 cursor-pointer hover:text-[#907B60]"
            onClick={() => handleSort("roomName")}
          >
            Room{" "}
            {sortField === "roomName" && (sortDirection === "asc" ? "↑" : "↓")}
          </div>
          <div
            className="col-span-2 cursor-pointer hover:text-[#907B60]"
            onClick={() => handleSort("checkInDate")}
          >
            Check In{" "}
            {sortField === "checkInDate" &&
              (sortDirection === "asc" ? "↑" : "↓")}
          </div>
          <div className="col-span-2">Contact</div>
          <div className="col-span-1">Status</div>
          <div
            className="col-span-1 cursor-pointer hover:text-[#907B60]"
            onClick={() => handleSort("totalPrice")}
          >
            Price{" "}
            {sortField === "totalPrice" &&
              (sortDirection === "asc" ? "↑" : "↓")}
          </div>
          <div className="col-span-1">Actions</div>
        </div>
      </div>

      {/* Table Rows */}
      <div className="space-y-3">
        <AnimatePresence>
          {sortedBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-xl"
            >
              <p className="text-gray-500">
                No bookings found matching your search
              </p>
            </motion.div>
          ) : (
            sortedBookings.map((booking) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden"
              >
                {/* Main Row */}
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-3 p-4 items-start cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() =>
                    setExpandedRow(
                      expandedRow === booking._id ? null : booking._id,
                    )
                  }
                >
                  <div className="col-span-3 min-w-0">
                    <p className="font-medium text-gray-900 break-words line-clamp-2">
                      {booking.guestDetails?.fullName}
                    </p>
                  </div>

                  <div className="col-span-2  min-w-0">
                    <div className="flex items-center gap-2">
                      <FiHome className="w-4 h-4 text-[#907B60]" />
                      <span className="text-gray-700 break-words line-clamp-1">
                        {booking.roomType || booking.room?.roomType}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-2  min-w-0">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4 text-[#907B60]" />
                      <div>
                        <p className="text-sm text-gray-700">
                          {new Date(booking.checkInDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          →{" "}
                          {new Date(booking.checkOutDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2  min-w-0">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <FiMail className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600 break-all text-xs">
                          {booking.guestDetails?.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FiPhone className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">
                          {booking.guestDetails?.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1  min-w-0">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 whitespace-nowrap rounded-full text-xs font-medium ${getStatusColor(booking)}`}
                    >
                      {getStatusIcon(booking)}
                      {getStatusText(booking)}
                    </span>
                  </div>

                  <div className="col-span-1  min-w-0">
                    <p className="font-semibold text-[#907B60] whitespace-nowrap">
                      £{booking.totalPrice || 0}
                    </p>
                  </div>

                  <div className="col-span-1  min-w-0">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      {expandedRow === booking._id ? (
                        <FiChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedRow === booking._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-100 bg-gray-50/50"
                    >
                      <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* ID Proof */}
                        {booking.guestDetails?.idProofUrl && (
                          <div className="col-span-2 md:col-span-1">
                            <p className="text-xs text-gray-500 mb-2">
                              ID Proof
                            </p>
                            <img
                              src={booking.guestDetails.idProofUrl}
                              alt="ID Proof"
                              className="w-full h-32 object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                        )}

                        {/* Additional Details */}
                        <div className="col-span-2 md:col-span-1">
                          <p className="text-xs text-gray-500 mb-2">
                            Booking Details
                          </p>
                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="text-gray-500">Booking ID:</span>{" "}
                              {booking._id}
                            </p>
                            <p>
                              <span className="text-gray-500">Room Type:</span>{" "}
                              {booking.roomType || booking.room?.roomType}
                            </p>
                            <p>
                              <span className="text-gray-500">Nights:</span>{" "}
                              {Math.ceil(
                                (new Date(booking.checkOutDate) -
                                  new Date(booking.checkInDate)) /
                                  (1000 * 60 * 60 * 24),
                              )}
                            </p>
                            <p>
                              <span className="text-gray-500">Guests:</span>{" "}
                              {booking.guestDetails?.guests || 2}
                            </p>
                          </div>
                        </div>

                        {/* Payment Info */}
                        {/* Payment Info */}
                        <div className="col-span-2 md:col-span-1">
                          <p className="text-xs text-gray-500 mb-2">
                            Payment Information
                          </p>
                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="text-gray-500">Total:</span> £
                              {booking.totalPrice || 0}
                            </p>
                            <p>
                              <span className="text-gray-500">Status:</span>
                              <span className="ml-2 text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs">
                                Paid
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="col-span-2 md:col-span-1">
                          <p className="text-xs text-gray-500 mb-2">Actions</p>
                          <button
                            onClick={() => downloadInvoice(booking._id)}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                          >
                            {" "}
                            <FiDownload className="w-4 h-4" />
                            Download Invoice
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Table Footer */}
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
        <p className="text-sm text-gray-500">
          Showing {sortedBookings.length} of {bookings.length} bookings
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 bg-[#907B60] text-white rounded-lg text-sm hover:bg-[#7a6850] transition-colors">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors">
            3
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
