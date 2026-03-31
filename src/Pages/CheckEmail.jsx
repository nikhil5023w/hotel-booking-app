// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FiMail, FiRefreshCw } from "react-icons/fi";
// import API from "../services/api";
// import toast from "react-hot-toast";

// export default function CheckEmail() {
//   const [loading, setLoading] = useState(false);
//   const [cooldown, setCooldown] = useState(30);
//   const [canResend, setCanResend] = useState(false);

//   useEffect(() => {
//     if (cooldown === 0) {
//       setCanResend(true);
//       return;
//     }

//     const timer = setTimeout(() => {
//       setCooldown((prev) => prev - 1);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [cooldown]);

//   const handleResend = async () => {
//     const email = localStorage.getItem("pendingEmail");

//     if (!email) {
//       toast.error("Please register again");
//       return;
//     }

//     try {
//       setLoading(true);

//       const { data } = await API.post("/auth/resend-verification", { email });

//       toast.success(data.message);

//       // reset timer
//       setCooldown(30);
//       setCanResend(false);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to resend email");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div>
//       {" "}
//       <div className="min-h-screen flex items-center justify-center bg-[#faf7f2] px-4">
//         <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 200 }}
//             className="flex justify-center mb-6"
//           >
//             <div className="w-16 h-16 bg-[#907B60] text-white rounded-full flex items-center justify-center">
//               <FiMail size={28} />
//             </div>
//           </motion.div>

//           <h2 className="text-2xl font-semibold mb-2">Verify Your Email</h2>

//           <p className="text-gray-500 mb-6">
//             We have sent a verification link to your email address. Please check
//             your inbox and click the link to activate your account.
//           </p>

//           <p className="text-sm text-gray-400 mb-6">
//             If you don't see the email, check your spam folder.
//           </p>

//           <Link
//             to="/login"
//             className="inline-block bg-[#907B60] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
//           >
//             Go to Login
//           </Link>
//           <div className="mt-6">
//             {!canResend ? (
//               <p className="text-sm text-gray-400">
//                 Resend available in {cooldown}s
//               </p>
//             ) : (
//               <button
//                 onClick={handleResend}
//                 disabled={loading}
//                 className="text-[#907B60] font-medium hover:underline"
//               >
//                 {loading ? "Sending..." : "Resend verification email"}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiRefreshCw } from "react-icons/fi";
import API from "../services/api";
import toast from "react-hot-toast";

export default function CheckEmail() {
  const email = localStorage.getItem("pendingEmail");

  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // countdown timer
  useEffect(() => {
    if (cooldown === 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (!email) {
      toast.error("Please register again");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post("/auth/resend-verification", { email });

      toast.success(data.message || "Verification email sent again");

      setCooldown(30);
      setCanResend(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#faf7f2] via-white to-[#faf7f2] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center relative overflow-hidden"
      >
        {/* pulse glow background */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute w-32 h-32 bg-[#907B60]/20 rounded-full blur-2xl top-6 left-1/2 -translate-x-1/2"
        />

        {/* icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6 relative z-10"
        >
          <div className="w-16 h-16 bg-[#907B60] text-white rounded-full flex items-center justify-center shadow-lg">
            <FiMail size={28} />
          </div>
        </motion.div>

        <h2 className="text-2xl font-semibold mb-2">Verify Your Email</h2>

        {email && (
          <p className="text-sm text-gray-400 mb-3">
            Verification email sent to
            <br />
            <span className="font-medium text-gray-600">{email}</span>
          </p>
        )}

        <p className="text-gray-500 mb-6">
          Please check your inbox and click the verification link to activate
          your account.
        </p>

        <p className="text-sm text-gray-400 mb-6">
          If you don't see the email, check your spam folder.
        </p>

        {/* login button */}
        <Link
          to="/login"
          className="inline-block bg-[#907B60] text-white px-6 py-3 rounded-xl hover:opacity-90 transition mb-4 shadow-md"
        >
          Go to Login
        </Link>

        {/* resend section */}
        <div className="mt-4">
          {!canResend ? (
            <p className="text-sm text-gray-400">
              Resend available in{" "}
              <span className="font-medium">{cooldown}s</span>
            </p>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleResend}
              disabled={loading}
              className="flex items-center justify-center gap-2 text-[#907B60] font-medium hover:underline mx-auto"
            >
              <FiRefreshCw className={loading ? "animate-spin" : ""} />

              {loading ? "Sending..." : "Resend verification email"}
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
