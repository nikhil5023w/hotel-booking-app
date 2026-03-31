// import { FaCreditCard } from "react-icons/fa";

// export default function ReservationSummary({
//   room,
//   dates,
//   handlePayment,
//   isFormValid,
// }) {
//   const total =
//     dates &&
//     ((new Date(dates.endDate) - new Date(dates.startDate)) /
//       (1000 * 60 * 60 * 24)) *
//       room.price;

//   return (
//     <div className="bg-theme-card p-6 rounded-2xl shadow-soft sticky top-24 animate-slideUp">
//       <h3 className="font-bold text-lg text-theme-primary">
//         Reservation Summary
//       </h3>

//       <p>Room: {room.name}</p>
//       <p>Room: {room.roomType}</p>
//       <p>Room: {room.description}</p>

//       {dates && (
//         <>
//           <p>
//             {new Date(dates.startDate).toLocaleDateString()} →{" "}
//             {new Date(dates.endDate).toLocaleDateString()}
//           </p>
//           <p className="font-semibold">Total: £{total.toFixed(2)}</p>
//         </>
//       )}

//       <button
//         onClick={handlePayment}
//         disabled={!isFormValid}
//         className="w-full mt-4 bg-theme-accent hover:opacity-90 text-white py-3 rounded-xl transition shadow"
//       >
//         <FaCreditCard className="inline mr-2" /> Continue
//       </button>
//     </div>
//   );
// }

import { motion } from "framer-motion";
import {
  FaCreditCard,
  FaCalendarAlt,
  FaHome,
  FaTag,
  FaBed,
  FaUser,
  FaShieldAlt,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import { FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";

export default function ReservationSummary({
  room,
  dates,
  handlePayment,
  isFormValid,
  guestCount = 2,
  specialRequests = "",
}) {
  // Calculate number of nights
  const nights = dates
    ? Math.ceil(
        (new Date(dates.endDate) - new Date(dates.startDate)) /
          (1000 * 60 * 60 * 24),
      )
    : 0;

  // Calculate totals
  const roomTotal = dates ? nights * (room?.price || 0) : 0;
  const grandTotal = roomTotal;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  if (!room) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-24"
    >
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        {/* Header with gradient */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-[#907B60] to-[#b89e84]">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
          />
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <FaHome className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-light text-white">Your Stay</h3>
              <p className="text-white/80 text-sm">
                Review your reservation details
              </p>
            </div>
          </div>
        </div>

        {/* Room Preview */}
        <div className="p-6 border-b border-gray-100">
          <motion.div variants={itemVariants} className="flex gap-4">
            {/* Room Image Placeholder */}
            <div className="w-28 h-20 rounded-xl overflow-hidden shadow-md">
              <img
                src={
                  room.coverImages?.[0] ||
                  "https://images.unsplash.com/photo-1618773928121-c32242e63f39"
                }
                alt={room.name}
                className="w-full h-full object-cover"
              />
              <div className="w-28 h-20 rounded-xl overflow-hidden shadow-md">
                <motion.img
                  key={room.coverImages?.[0]}
                  src={
                    room.coverImages?.[0] ||
                    "https://images.unsplash.com/photo-1618773928121-c32242e63f39"
                  }
                  alt={room.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{room.name}</h4>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {room.description}
              </p>

              {/* Room Features */}
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <FaBed className="w-3 h-3 text-[#907B60]" />
                  <span>Queen Bed</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <FaUser className="w-3 h-3 text-[#907B60]" />
                  <span>Up to {guestCount} guests</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dates Summary */}
        {dates && (
          <motion.div
            variants={itemVariants}
            className="p-6 border-b border-gray-100 bg-gray-50/50"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#907B60]/10 rounded-xl flex items-center justify-center">
                <FaCalendarAlt className="w-5 h-5 text-[#907B60]" />
              </div>

              <div className="flex-1">
                <p className="text-sm text-gray-500">Check-in / Check-out</p>
                <p className="font-medium text-gray-900">
                  {new Date(dates.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  →{" "}
                  {new Date(dates.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="text-xs text-[#907B60] mt-1">
                  <FiClock className="inline w-3 h-3 mr-1" />
                  {nights} {nights === 1 ? "night" : "nights"}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Price Breakdown */}
        <motion.div
          variants={itemVariants}
          className="p-6 border-b border-gray-100"
        >
          <h5 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            <FiDollarSign className="w-4 h-4 text-[#907B60]" />
            Price Details
          </h5>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                £{room.price} x {nights} {nights === 1 ? "night" : "nights"}
              </span>
              <span className="font-medium">£{roomTotal.toFixed(2)}</span>
            </div>

            {specialRequests && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Special Requests</p>
                <p className="text-sm text-gray-700 italic">
                  "{specialRequests}"
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Total */}
        <motion.div
          variants={itemVariants}
          className="p-6 bg-gradient-to-r from-[#907B60]/5 to-[#b89e84]/5"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total amount</p>
              <p className="text-xs text-gray-400">
                Including all taxes & fees
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[#907B60]">
                £{grandTotal.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">
                for {nights} {nights === 1 ? "night" : "nights"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Payment Button */}
        <div className="p-6 pt-0">
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePayment}
            disabled={!isFormValid}
            className={`
              w-full py-4 rounded-xl font-medium text-white
              flex items-center justify-center gap-3
              transition-all relative overflow-hidden
              ${
                isFormValid
                  ? "bg-gradient-to-r from-[#907B60] to-[#b89e84] shadow-lg hover:shadow-xl"
                  : "bg-gray-300 cursor-not-allowed"
              }
            `}
          >
            <FaCreditCard className="w-5 h-5" />
            <span>Proceed to Payment</span>

            {/* Shine effect */}
            {isFormValid && (
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            )}
          </motion.button>

          {/* Payment Security Badges */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500"
          >
            <div className="flex items-center gap-1">
              <FaShieldAlt className="w-3 h-3 text-green-500" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-1">
              <FaCheckCircle className="w-3 h-3 text-green-500" />
              <span>SSL Encrypted</span>
            </div>
          </motion.div>
        </div>

        {/* Cancellation Policy */}
        <motion.div
          variants={itemVariants}
          className="px-6 pb-6 text-xs text-gray-500 border-t border-gray-100 pt-4"
        >
          <div className="flex items-start gap-2">
            <FaStar className="w-3 h-3 text-[#907B60] mt-0.5" />
            <div>
              <p className="font-medium text-gray-700">Free cancellation</p>
              <p className="mt-1">
                Cancel up to 48 hours before check-in for a full refund. Terms
                apply for last-minute changes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-center"
      >
        <p className="text-xs text-gray-400">
          By proceeding, you agree to our{" "}
          <a href="/terms" className="text-[#907B60] hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-[#907B60] hover:underline">
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}
