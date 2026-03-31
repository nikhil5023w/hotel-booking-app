// import { useState, useContext } from "react";
// import API from "../services/api.js";
// import { AuthContext } from "../context/AuthContext.jsx";
// import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
// import toast from "react-hot-toast";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { data } = await API.post("/auth/login", form);
//     login(data);
//     navigate("/");
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
//         <h2 className="text-2xl font-bold">Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border p-2 rounded"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-2 rounded"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         {/* Forgot password link */}
//         <div className="text-right">
//           <button
//             type="button"
//             onClick={() => navigate("/forgot-password")}
//             className="text-sm text-blue-600 hover:underline"
//           >
//             Forgot password?
//           </button>
//         </div>

//         <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
//           Login
//         </button>
//       </form>

//       {/* Divider */}
//       <div className="flex items-center my-6 max-w-md mx-auto">
//         <div className="flex-grow border-t"></div>
//         <span className="mx-3 text-gray-400">OR</span>
//         <div className="flex-grow border-t"></div>
//       </div>

//       {/* Google login */}
//       <div className="flex justify-center">
//         <GoogleLogin
//           onSuccess={async (credentialResponse) => {
//             try {
//               const res = await API.post("/auth/google-login", {
//                 credential: credentialResponse.credential,
//               });

//               login({
//                 name: res.data.name,
//                 email: res.data.email,
//                 role: res.data.role,
//                 token: res.data.token,
//               });

//               toast.success("Logged in with Google");

//               navigate("/");
//             } catch (err) {
//               console.error(err);
//               toast.error("Google login failed");
//             }
//           }}
//         />
//       </div>
//     </div>
//   );
// }

import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogIn,
  FiHome,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const shakeAnimation = {
    x: [0, -8, 8, -8, 8, 0],
    transition: { duration: 0.4 },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data } = await API.post("/auth/login", form);
      login(data);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

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

        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 30 L30 55 L5 30 Z' fill='%23907B60' fill-opacity='0.1'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md"
      >
        {/* Brand Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <Link to="/" className="inline-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#907B60] to-[#b89e84] rounded-2xl flex items-center justify-center shadow-lg">
                <FiHome className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-serif font-semibold bg-gradient-to-r from-[#907B60] to-[#b89e84] bg-clip-text text-transparent">
                Wilton Manor
              </span>
            </motion.div>
          </Link>
          <motion.p variants={itemVariants} className="text-gray-500">
            Welcome back to your home away from home
          </motion.p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          variants={itemVariants}
          animate={error ? shakeAnimation : ""}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
        >
          {/* Header with gradient */}
          <div className="relative px-8 pt-8 pb-6 bg-gradient-to-r from-[#907B60] to-[#b89e84]">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
            />
            <div className="relative z-10">
              <motion.h2
                variants={itemVariants}
                className="text-3xl font-light text-white"
              >
                Sign In
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-white/80 text-sm mt-2"
              >
                Access your account to manage bookings and more
              </motion.p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FiMail className="w-4 h-4 text-[#907B60]" />
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all pl-11 ${
                      error
                        ? "border-red-400 focus:ring-red-200"
                        : "border-gray-200 focus:ring-[#907B60]/20 focus:border-[#907B60]"
                    }`}
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#907B60] transition-colors" />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FiLock className="w-4 h-4 text-[#907B60]" />
                  Password
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all pl-11 ${
                      error
                        ? "border-red-400 focus:ring-red-200"
                        : "border-gray-200 focus:ring-[#907B60]/20 focus:border-[#907B60]"
                    }`}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#907B60] transition-colors" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#907B60] transition-colors"
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </motion.div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {error}
                </motion.p>
              )}
              {/* Remember Me & Forgot Password */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-between"
              >
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#907B60] focus:ring-[#907B60]"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-[#907B60] transition-colors">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-[#907B60] hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </motion.div>

              {/* Login Button */}
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#907B60] to-[#b89e84] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <FiLogIn className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
                    <span>Sign In</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="flex items-center my-8"
            >
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-sm text-gray-400">
                or continue with
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </motion.div>

            {/* Google Login */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const res = await API.post("/auth/google-login", {
                      credential: credentialResponse.credential,
                    });

                    login({
                      name: res.data.name,
                      email: res.data.email,
                      role: res.data.role,
                      token: res.data.token,
                    });

                    toast.success("Successfully logged in with Google!");
                    navigate("/");
                  } catch (err) {
                    console.error(err);
                    toast.error("Google login failed");
                  }
                }}
                onError={() => {
                  toast.error("Google login failed");
                }}
                theme="outline"
                size="large"
                text="continue_with"
                shape="circle"
              />
            </motion.div>

            {/* Sign Up Link */}
            <motion.div variants={itemVariants} className="text-center mt-8">
              <p className="text-gray-600">
                New to Wilton Manor?{" "}
                <Link
                  to="/register"
                  className="text-[#907B60] font-medium hover:underline inline-flex items-center gap-1 group"
                >
                  Create an account
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              variants={itemVariants}
              className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500"
            >
              <FiCheckCircle className="w-4 h-4 text-green-500" />
              <span>Secure login • Encrypted connection</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-6 mt-8 text-xs text-gray-500"
        >
          <Link
            to="/privacy"
            className="hover:text-[#907B60] transition-colors"
          >
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-[#907B60] transition-colors">
            Terms
          </Link>
          <Link
            to="/contact"
            className="hover:text-[#907B60] transition-colors"
          >
            Contact
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
