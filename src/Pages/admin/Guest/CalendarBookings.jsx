// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// export default function CalendarBookings({ bookings, selectedDate, setSelectedDate }) {

//   const bookingsForDate = bookings.filter((b) => {
//     const checkIn = new Date(b.checkInDate);
//     const checkOut = new Date(b.checkOutDate);
//     return selectedDate >= checkIn && selectedDate <= checkOut;
//   });

//   return (
//     <div>
//       <Calendar onChange={setSelectedDate} value={selectedDate} />

//       <h2 className="text-xl font-semibold mt-6">
//         Bookings on {selectedDate.toDateString()}
//       </h2>

//       <div className="space-y-3 mt-4">
//         {bookingsForDate.length === 0 && (
//           <p className="text-gray-500">No bookings for this date</p>
//         )}

//         {bookingsForDate.map((booking) => (
//           <div key={booking._id} className="border p-4 rounded bg-white shadow">
//             <p><strong>Guest:</strong> {booking.guestDetails?.fullName}</p>
//             <p><strong>Phone:</strong> {booking.guestDetails?.phone}</p>
//             <p><strong>Room:</strong> {booking.room?.name}</p>
//             <p>
//               <strong>Stay:</strong>{" "}
//               {new Date(booking.checkInDate).toLocaleDateString()} →{" "}
//               {new Date(booking.checkOutDate).toLocaleDateString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import Calendar from "react-calendar";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiPhone,
  FiHome,
  FiCalendar,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
} from "react-icons/fi";
import "react-calendar/dist/Calendar.css";

export default function CalendarBookings({
  bookings,
  selectedDate,
  setSelectedDate,
}) {
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookingsForDate = bookings.filter((b) => {
    const checkIn = new Date(b.checkInDate);
    const checkOut = new Date(b.checkOutDate);
    const date = new Date(selectedDate);
    date.setHours(0, 0, 0, 0);
    return date >= checkIn && date <= checkOut;
  });

  // Function to get bookings for a specific date (for calendar tiles)
  const getBookingsForDate = (date) => {
    return bookings.filter((b) => {
      const checkIn = new Date(b.checkInDate);
      const checkOut = new Date(b.checkOutDate);
      const currentDate = new Date(date);
      currentDate.setHours(0, 0, 0, 0);
      return currentDate >= checkIn && currentDate <= checkOut;
    });
  };

  // Custom tile content for calendar
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dayBookings = getBookingsForDate(date);
      if (dayBookings.length > 0) {
        return (
          <div className="flex justify-center gap-0.5 mt-1">
            {dayBookings.slice(0, 3).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-[#907B60] rounded-full" />
            ))}
            {dayBookings.length > 3 && (
              <span className="text-[8px] text-[#907B60]">
                +{dayBookings.length - 3}
              </span>
            )}
          </div>
        );
      }
    }
    return null;
  };

  // Custom tile className
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dayBookings = getBookingsForDate(date);
      if (dayBookings.length > 0) {
        return "has-bookings";
      }
    }
    return null;
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Calendar Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-1"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiCalendar className="text-[#907B60]" />
            Select Date
          </h3>

          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={tileContent}
            tileClassName={tileClassName}
            prevLabel={<FiChevronLeft className="w-5 h-5" />}
            nextLabel={<FiChevronRight className="w-5 h-5" />}
            prev2Label={null}
            next2Label={null}
            className="w-full border-none"
          />

          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">
                Total bookings today
              </span>
              <span className="text-lg font-semibold text-[#907B60]">
                {bookingsForDate.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Active guests</span>
              <span className="text-lg font-semibold text-green-600">
                {
                  bookingsForDate.filter((b) => {
                    const today = new Date();
                    const checkIn = new Date(b.checkInDate);
                    const checkOut = new Date(b.checkOutDate);
                    return today >= checkIn && today <= checkOut;
                  }).length
                }
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bookings List Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-2"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Bookings for{" "}
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>
            <span className="px-3 py-1 bg-[#907B60]/10 text-[#907B60] rounded-full text-sm">
              {bookingsForDate.length}{" "}
              {bookingsForDate.length === 1 ? "booking" : "bookings"}
            </span>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {bookingsForDate.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 bg-gray-50 rounded-xl"
                >
                  <FiCalendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No bookings for this date</p>
                </motion.div>
              ) : (
                bookingsForDate.map((booking, index) => (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -2 }}
                    onClick={() =>
                      setSelectedBooking(
                        selectedBooking === booking._id ? null : booking._id,
                      )
                    }
                    className="relative bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer border-l-4 border-[#907B60]"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Guest Info */}
                      <div className="md:col-span-1">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-[#907B60]/10 rounded-full flex items-center justify-center">
                            <FiUser className="w-5 h-5 text-[#907B60]" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {booking.guestDetails?.fullName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {booking.guestDetails?.email}
                            </p>
                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                              <FiPhone className="w-3 h-3" />
                              {booking.guestDetails?.phone}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Room Info */}
                      <div className="md:col-span-1">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <FiHome className="w-5 h-5 text-blue-600" />
                          </div>

                          <div>
                            <p className="font-medium text-gray-900">
                              {booking.roomType || booking.room?.roomType}
                            </p>

                            <p className="text-xs text-gray-500">
                              Room Category
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Stay Duration */}
                      <div className="md:col-span-1">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <FiClock className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Stay Duration
                            </p>
                            <div className="flex">
                              {" "}
                              <p className="text-xs text-gray-600">
                                {new Date(
                                  booking.checkInDate,
                                ).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-gray-600">
                                ➟{" "}
                                {new Date(
                                  booking.checkOutDate,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
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

                      {/* Status & Price */}
                      <div className="md:col-span-1">
                        <div className="flex flex-col items-end justify-between h-full">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              new Date(booking.checkInDate) <= new Date() &&
                              new Date(booking.checkOutDate) >= new Date()
                                ? "bg-green-100 text-green-600"
                                : new Date(booking.checkOutDate) < new Date()
                                  ? "bg-gray-100 text-gray-600"
                                  : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {new Date(booking.checkInDate) <= new Date() &&
                            new Date(booking.checkOutDate) >= new Date()
                              ? "Checked In"
                              : new Date(booking.checkOutDate) < new Date()
                                ? "Checked Out"
                                : "Upcoming"}
                          </span>
                          <p className="text-xl font-bold text-[#907B60] mt-2">
                            £{booking.totalPrice || 0}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {selectedBooking === booking._id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4 pt-4 border-t border-gray-200"
                        >
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {booking.guestDetails?.idProofUrl && (
                              <div>
                                <p className="text-xs text-gray-500 mb-1">
                                  ID Proof
                                </p>
                                <img
                                  src={booking.guestDetails.idProofUrl}
                                  alt="ID"
                                  className="w-full h-20 object-cover rounded-lg border"
                                />
                              </div>
                            )}
                            <div>
                              <p className="text-xs text-gray-500 mb-1">
                                Booking ID
                              </p>
                              <p className="text-sm font-mono">
                                {booking._id.slice(-8)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">
                                Special Requests
                              </p>
                              <p className="text-sm">
                                {booking.specialRequests || "None"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">
                                Payment Status
                              </p>
                              <p className="text-sm text-green-600">Paid</p>
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
        </div>
      </motion.div>
    </div>
  );
}
