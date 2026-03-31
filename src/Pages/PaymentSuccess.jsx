import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaEnvelope,
  FaCalendarAlt,
  FaHome,
  FaDownload,
  FaShare,
  FaStar,
  FaHeart,
} from "react-icons/fa";
import { FiClock, FiArrowRight } from "react-icons/fi";
import confetti from "canvas-confetti";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import PaymentSuccessSkeleton from "../Components/Skeletons/PaymentSuccessSkeleton";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let retries = 0;
    let isMounted = true;

    const verifyPayment = async () => {
      try {
        const res = await API.get(
          `/payments/verify-session?session_id=${sessionId}`,
        );

        if (!isMounted) return;

        if (res.data.success) {
          const booking = res.data.booking;

          setBookingDetails({
            id: booking._id,
            roomName: booking.room.name,
            checkIn: new Date(booking.checkInDate),
            checkOut: new Date(booking.checkOutDate),
            guests: 1,
            totalPaid: booking.totalPrice,
            email: booking.guestDetails.email,
          });

          setLoading(false);
        } else if (res.data.pending && retries < 5) {
          retries++;
          setTimeout(verifyPayment, 2000);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    verifyPayment();

    return () => {
      isMounted = false;
    };
  }, [sessionId]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const checkmarkVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
  };

  // Trigger confetti on mount
  useEffect(() => {
    if (!bookingDetails) return; // ✅ ADD THIS

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#907B60", "#b89e84", "#d4b595", "#4CAF50", "#2196F3"],
    });

    setTimeout(() => {
      confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
    }, 200);
  }, [bookingDetails]);

  useEffect(() => {
    if (!bookingDetails) return;

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [bookingDetails]);

  useEffect(() => {
    if (countdown <= 0 && bookingDetails) {
      navigate("/dashboard/bookings");
    }
  }, [countdown, bookingDetails, navigate]);

  const handleDownloadReceipt = () => {
    // Simulate receipt download
    const element = document.createElement("a");
    const file = new Blob(
      [
        `Booking Receipt\nID: ${bookingDetails.id}\nAmount: £${bookingDetails.totalPaid}`,
      ],
      { type: "text/plain" },
    );
    element.href = URL.createObjectURL(file);
    element.download = `receipt-${bookingDetails.id}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  if (loading) {
    return <PaymentSuccessSkeleton />;
  }

  if (!bookingDetails) {
    return (
      <div className="text-center py-20 text-red-500">
        Something went wrong. Please check your bookings.
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf7f2] via-white to-[#faf7f2] flex items-center justify-center px-4 py-12">
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
          className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#907B60]/10 to-transparent rounded-full blur-3xl"
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
          className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#907B60]/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-2xl w-full"
      >
        {/* Success Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Success Header */}
          <div className="relative px-8 pt-12 pb-8 bg-gradient-to-r from-green-500 to-green-600 text-center">
            <motion.div
              variants={checkmarkVariants}
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <FaCheckCircle className="w-14 h-14 text-green-500" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl font-light text-white mb-2"
            >
              Payment Successful!
            </motion.h1>

            <motion.p variants={itemVariants} className="text-white/90 text-lg">
              Your booking has been confirmed
            </motion.p>

            {/* Decorative elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"
            />
          </div>

          {/* Booking Details */}
          <div className="p-8">
            <motion.div variants={itemVariants} className="text-center mb-8">
              <p className="text-sm text-gray-500 mb-2">Booking Reference</p>
              <p className="text-2xl font-mono font-bold text-[#907B60] bg-[#907B60]/5 py-3 px-6 rounded-xl inline-block">
                {bookingDetails.id}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 mb-8">
              {/* Room Details */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-[#907B60] to-[#b89e84] rounded-xl flex items-center justify-center">
                  <FaHome className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Room</p>
                  <p className="font-semibold text-gray-900">
                    {bookingDetails.roomName}
                  </p>
                </div>
              </div>

              {/* Date Range */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <FaCalendarAlt className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-in / Check-out</p>
                  <p className="font-semibold text-gray-900">
                    {bookingDetails.checkIn.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    →{" "}
                    {bookingDetails.checkOut.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    <FiClock className="inline w-3 h-3 mr-1" />
                    {Math.ceil(
                      (bookingDetails.checkOut - bookingDetails.checkIn) /
                        (1000 * 60 * 60 * 24),
                    )}{" "}
                    nights
                  </p>
                </div>
              </div>

              {/* Guest & Payment */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Guests</p>
                  <p className="font-semibold text-gray-900">
                    {bookingDetails.guests}{" "}
                    {bookingDetails.guests === 1 ? "Guest" : "Guests"}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Total Paid</p>
                  <p className="font-semibold text-[#907B60]">
                    £{bookingDetails.totalPaid}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Confirmation Email */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 p-4 bg-green-50 rounded-xl mb-8"
            >
              <FaEnvelope className="w-5 h-5 text-green-600" />
              <p className="text-sm text-gray-700">
                A confirmation email has been sent to{" "}
                <span className="font-semibold">{bookingDetails.email}</span>
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownloadReceipt}
                  className="px-6 py-3 bg-[#907B60] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <FaDownload className="w-4 h-4" />
                  Download Receipt
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 border-2 border-[#907B60] text-[#907B60] rounded-xl font-medium hover:bg-[#907B60] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <FaShare className="w-4 h-4" />
                  Share
                </motion.button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link to="/dashboard/bookings">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                  >
                    <FaHome className="w-4 h-4" />
                    My Bookings
                  </motion.button>
                </Link>

                <Link to="/rooms">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                  >
                    <FaStar className="w-4 h-4" />
                    Browse More
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Redirect Countdown */}
            <motion.div variants={itemVariants} className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Redirecting to your bookings in{" "}
                <span className="font-bold text-[#907B60]">{countdown}</span>{" "}
                seconds
              </p>
              <button
                onClick={() => navigate("/dashboard/bookings")}
                className="text-xs text-[#907B60] hover:underline mt-2 inline-flex items-center gap-1"
              >
                Go now
                <FiArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          variants={itemVariants}
          className="mt-6 text-center text-sm text-gray-500"
        >
          <p className="flex items-center justify-center gap-2">
            <FaHeart className="w-4 h-4 text-red-400" />
            Thank you for choosing Wilton Manor
          </p>
          <p className="mt-2">
            Need help?{" "}
            <a href="/contact" className="text-[#907B60] hover:underline">
              Contact our concierge
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
