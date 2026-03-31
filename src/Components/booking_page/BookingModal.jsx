// export default function BookingModal({
//   room,
//   dates,
//   guest,
//   docType,
//   customDocName,
//   acceptedTerms,
//   setAcceptedTerms,
//   setShowSummary,
//   confirmPayment,
//   loading,
// }) {
//   const total =
//     ((new Date(dates.endDate) - new Date(dates.startDate)) /
//       (1000 * 60 * 60 * 24)) *
//     room.price;

//   return (
//     <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center animate-fadeIn">
//       <div className="bg-theme-card p-6 rounded-2xl w-full max-w-md shadow-soft animate-slideUp">
//         {" "}
//         <h3 className="font-bold text-xl mb-3">Booking Summary</h3>
//         <p>Room: {room.name}</p>
//         <p>
//           {new Date(dates.startDate).toLocaleDateString()} →{" "}
//           {new Date(dates.endDate).toLocaleDateString()}
//         </p>
//         <p>Guest: {guest.fullName}</p>
//         <p>Document: {docType === "Other" ? customDocName : docType}</p>
//         <p className="font-semibold mt-2">Total £{total.toFixed(2)}</p>
//         <div className="mt-4 flex gap-2">
//           <input
//             type="checkbox"
//             checked={acceptedTerms}
//             onChange={(e) => setAcceptedTerms(e.target.checked)}
//           />
//           <p className="text-sm">Accept terms</p>
//         </div>
//         <div className="flex justify-end gap-3 mt-5">
//           <button
//             onClick={() => setShowSummary(false)}
//             className="px-4 py-2 bg-gray-300 rounded"
//           >
//             Edit
//           </button>

//           <button
//             onClick={confirmPayment}
//             disabled={loading}
//             className="px-4 py-2 bg-theme-accent text-white rounded-lg hover:scale-105 transition"
//           >
//             {loading ? "Processing..." : "Confirm & Pay"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaUser,
  FaIdCard,
  FaCreditCard,
  FaCheckCircle,
  FaShieldAlt,
  FaLock,
  FaHome,
  FaTag,
  FaFilePdf,
  FaFileImage,
  FaFileAlt,
} from "react-icons/fa";
import { FiClock, FiDollarSign, FiX, FiAlertCircle } from "react-icons/fi";
import { useState } from "react";

export default function BookingModal({
  room,
  dates,
  guest,
  docType,
  customDocName,
  acceptedTerms,
  setAcceptedTerms,
  setShowSummary,
  confirmPayment,
  loading,
}) {
  const [hoveredTerm, setHoveredTerm] = useState(false);

  // Calculate nights and total
  const nights = Math.ceil(
    (new Date(dates.endDate) - new Date(dates.startDate)) /
      (1000 * 60 * 60 * 24),
  );
  const roomTotal = nights * (room?.price || 0);
  const grandTotal = roomTotal;

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      transition: { duration: 0.2 },
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

  // Get document icon based on type
  const getDocumentIcon = () => {
    if (docType === "Passport") return <FaFilePdf className="w-4 h-4" />;
    if (docType === "Driving License")
      return <FaFileImage className="w-4 h-4" />;
    if (docType === "Other") return <FaFileAlt className="w-4 h-4" />;
    return <FaIdCard className="w-4 h-4" />;
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4"
        onClick={() => setShowSummary(false)}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-md max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            {/* Header with gradient */}
            <div className="relative px-6 py-5 bg-gradient-to-r from-[#907B60] to-[#b89e84]">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation(); // ✅ stop bubbling
                  setShowSummary(false); // ✅ close modal
                }}
                className="absolute top-8 right-4 z-50 w-8 h-8 bg-white/20 hover-bg-black backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </motion.button>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"
              />
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FaHome className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-light text-white">
                    Confirm Your Stay
                  </h3>
                  <p className="text-white/80 text-sm">
                    Review booking details
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Room Summary */}
              <motion.div
                variants={itemVariants}
                className="flex gap-3 items-start"
              >
                <div className="w-10 h-10 bg-[#907B60]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaTag className="w-5 h-5 text-[#907B60]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Selected Room</p>
                  <p className="font-semibold text-gray-900">{room.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Luxury accommodation with premium amenities
                  </p>
                </div>
              </motion.div>

              {/* Date Range */}
              <motion.div
                variants={itemVariants}
                className="flex gap-3 items-start"
              >
                <div className="w-10 h-10 bg-[#907B60]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaCalendarAlt className="w-5 h-5 text-[#907B60]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Check-in / Check-out</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {new Date(dates.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-gray-400">→</span>
                    <span className="font-medium text-gray-900">
                      {new Date(dates.endDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-[#907B60] mt-1">
                    <FiClock className="inline w-3 h-3 mr-1" />
                    {nights} {nights === 1 ? "night" : "nights"}
                  </p>
                </div>
              </motion.div>

              {/* Guest Details */}
              <motion.div
                variants={itemVariants}
                className="flex gap-3 items-start"
              >
                <div className="w-10 h-10 bg-[#907B60]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaUser className="w-5 h-5 text-[#907B60]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Guest Information</p>
                  <p className="font-medium text-gray-900">{guest.fullName}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                    {getDocumentIcon()}
                    <span>
                      ID: {docType === "Other" ? customDocName : docType}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Price Breakdown */}
              <motion.div
                variants={itemVariants}
                className="bg-gray-50 rounded-xl p-4"
              >
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <FiDollarSign className="w-4 h-4 text-[#907B60]" />
                  Price Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      £{room.price} x {nights} nights
                    </span>
                    <span className="font-medium">£{roomTotal.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-[#907B60] text-lg">
                      £{grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Terms Agreement */}
              <motion.div
                variants={itemVariants}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                onHoverStart={() => setHoveredTerm(true)}
                onHoverEnd={() => setHoveredTerm(false)}
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-[#907B60] focus:ring-[#907B60]"
                  />
                  <motion.div
                    animate={{ scale: hoveredTerm ? 1.2 : 1 }}
                    className="absolute inset-0 pointer-events-none"
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="text-[#907B60] hover:underline font-medium"
                  >
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="text-[#907B60] hover:underline font-medium"
                  >
                    Privacy Policy
                  </a>
                </label>
              </motion.div>

              {/* Security Badge */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2 text-xs text-gray-500 justify-center"
              >
                <FaShieldAlt className="w-4 h-4 text-green-500" />
                <span>Secure payment • SSL encrypted</span>
                <FaLock className="w-3 h-3 text-gray-400 ml-2" />
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSummary(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
                >
                  Edit Details
                </motion.button>

                <motion.button
                  whileHover={{ scale: acceptedTerms ? 1.02 : 1 }}
                  whileTap={{ scale: acceptedTerms ? 0.98 : 1 }}
                  onClick={confirmPayment}
                  disabled={!acceptedTerms || loading}
                  className={`
                    flex-1 px-4 py-3 rounded-xl font-medium
                    flex items-center justify-center gap-2
                    transition-all relative overflow-hidden
                    ${
                      acceptedTerms && !loading
                        ? "bg-gradient-to-r from-[#907B60] to-[#b89e84] text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }
                  `}
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <FaCreditCard className="w-4 h-4" />
                      <span>Confirm & Pay</span>
                    </>
                  )}

                  {/* Shine effect */}
                  {acceptedTerms && !loading && (
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                  )}
                </motion.button>
              </motion.div>

              {/* Cancellation Info */}
              <motion.div variants={itemVariants} className="text-center">
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                  <FiAlertCircle className="w-3 h-3" />
                  Free cancellation up to 48 hours before check-in
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
