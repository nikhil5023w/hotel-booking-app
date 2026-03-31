// import { useState } from "react";
// import API from "../services/api";
// import toast from "react-hot-toast";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (!email) return toast.error("Email required");

//     try {
//       setLoading(true);
//       await API.post("/auth/forgot-password", { email });
//       toast.success("Reset link sent to email");
//       setEmail("");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-2xl shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

//       <form onSubmit={submitHandler} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Enter email"
//           className="w-full border p-3 rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <button
//           disabled={loading}
//           className="w-full bg-theme-accent text-white p-3 rounded hover:opacity-90"
//         >
//           {loading ? "Sending..." : "Send Reset Link"}
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { 
  FiMail, 
  FiArrowLeft, 
  FiCheckCircle, 
  FiLock,
  FiAlertCircle,
  FiSend
} from "react-icons/fi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      setEmailError("Email is required");
      return toast.error("Email is required");
    }
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return toast.error("Please enter a valid email address");
    }

    try {
      setLoading(true);
      setEmailError("");
      await API.post("/auth/forgot-password", { email });
      
      // Show success state
      setIsSubmitted(true);
      toast.success("Reset link sent successfully!");
      
      // Clear email after success
      setEmail("");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to send reset link";
      toast.error(errorMessage);
      setEmailError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf7f2] via-white to-[#faf7f2] flex items-center justify-center px-4 py-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
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
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-full max-w-md"
      >
        {/* Back to login link */}
        <motion.div variants={itemVariants} className="mb-6">
          <Link 
            to="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#907B60] transition-colors group"
          >
            <motion.div
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <FiArrowLeft className="w-5 h-5" />
            </motion.div>
            <span>Back to Login</span>
          </Link>
        </motion.div>

        {/* Main Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
        >
          {/* Header with decorative element */}
          <div className="relative px-8 pt-8 pb-6 bg-gradient-to-r from-[#907B60] to-[#b89e84]">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
            />
            
            <div className="relative z-10">
              <motion.div 
                variants={itemVariants}
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4"
              >
                <FiLock className="w-8 h-8 text-white" />
              </motion.div>
              
              <motion.h2 
                variants={itemVariants}
                className="text-3xl font-light text-white"
              >
                Forgot Password?
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-white/80 text-sm mt-2 max-w-sm"
              >
                No worries! Enter your email and we'll send you a link to reset your password.
              </motion.p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={submitHandler}
                  className="space-y-6"
                >
                  {/* Email Input */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FiMail className="w-4 h-4 text-[#907B60]" />
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className={`
                          w-full px-4 py-3 bg-gray-50 border rounded-xl
                          focus:outline-none focus:ring-2 transition-all
                          ${emailError 
                            ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                            : 'border-gray-200 focus:ring-[#907B60]/20 focus:border-[#907B60]'
                          }
                        `}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError("");
                        }}
                      />
                      {emailError && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <FiAlertCircle className="w-5 h-5 text-red-500" />
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Error message */}
                    <AnimatePresence>
                      {emailError && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm text-red-500 flex items-center gap-1 mt-1"
                        >
                          <FiAlertCircle className="w-4 h-4" />
                          {emailError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    type="submit"
                    className={`
                      w-full py-4 rounded-xl font-medium text-white
                      flex items-center justify-center gap-3
                      transition-all relative overflow-hidden
                      ${loading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-[#907B60] to-[#b89e84] shadow-lg hover:shadow-xl'
                      }
                    `}
                  >
                    {/* Loading spinner */}
                    {loading && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    )}
                    
                    <span>{loading ? "Sending..." : "Send Reset Link"}</span>
                    
                    {!loading && <FiSend className="w-5 h-5" />}
                    
                    {/* Shine effect */}
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                  </motion.button>

                  {/* Security Note */}
                  <motion.p 
                    variants={itemVariants}
                    className="text-xs text-center text-gray-500 mt-4"
                  >
                    We'll send a secure link to your email. 
                    <br />The link will expire in 1 hour.
                  </motion.p>
                </motion.form>
              ) : (
                // Success State
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <FiCheckCircle className="w-10 h-10 text-green-500" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Check Your Email
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    We've sent a password reset link to:
                    <br />
                    <span className="font-medium text-[#907B60]">{email}</span>
                  </p>
                  
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">
                      Didn't receive the email? Check your spam folder or
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsSubmitted(false)}
                      className="text-[#907B60] font-medium hover:underline"
                    >
                      Try another email address
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50/80 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Remember your password?{' '}
              <Link to="/login" className="text-[#907B60] font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Additional Help */}
        <motion.div 
          variants={itemVariants}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <Link to="/contact" className="text-[#907B60] hover:underline">
              Contact Support
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}