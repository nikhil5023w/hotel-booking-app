// import { useState } from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import API from "../services/api";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// export default function Register() {
//   const { login } = useContext(AuthContext);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await API.post("/auth/register", form);
//     navigate("/login");
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
//         <h2 className="text-2xl font-bold">Register</h2>

//         <input
//           type="text"
//           placeholder="Name"
//           className="w-full border p-2"
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border p-2"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-2"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <button className="bg-green-600 text-white px-4 py-2 rounded">
//           Register
//         </button>
//       </form>
//       <div className="flex items-center my-6">
//         <div className="flex-grow border-t"></div>
//         <span className="mx-3 text-gray-400">OR</span>
//         <div className="flex-grow border-t"></div>
//       </div>
//       <div className="mt-6 flex justify-center">
//         <GoogleLogin
//           onSuccess={async (credentialResponse) => {
//             try {
//               const res = await API.post("/auth/google-login", {
//                 credential: credentialResponse.credential,
//               });

//               // IMPORTANT: call login function
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

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiHome,
  FiCheckCircle,
  FiAlertCircle,
  FiUserPlus,
} from "react-icons/fi";

export default function Register() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
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

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setForm({ ...form, password: newPassword });
    checkPasswordStrength(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    try {
      await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      toast.success("Registration successful");
      localStorage.setItem("pendingEmail", form.email);
      navigate("/check-email");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    if (passwordStrength >= 4) return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    if (passwordStrength >= 4) return "Strong";
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
            Join our community of luxury travelers
          </motion.p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          variants={itemVariants}
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
                Create Account
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-white/80 text-sm mt-2"
              >
                Start your journey with exclusive benefits
              </motion.p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FiUser className="w-4 h-4 text-[#907B60]" />
                  Full Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all pl-11"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#907B60] transition-colors" />
                </div>
              </motion.div>

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
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all pl-11"
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
                    placeholder="Create a strong password"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all pl-11"
                    value={form.password}
                    onChange={handlePasswordChange}
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

                {/* Password Strength Meter */}
                {form.password && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 space-y-2"
                  >
                    <div className="flex gap-1 h-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                            level <= passwordStrength
                              ? getStrengthColor()
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      Password strength:{" "}
                      <span className="font-medium">{getStrengthText()}</span>
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FiLock className="w-4 h-4 text-[#907B60]" />
                  Confirm Password
                </label>
                <div className="relative group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all pl-11"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                    required
                  />
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#907B60] transition-colors" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#907B60] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {form.confirmPassword && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1 mt-1"
                  >
                    {form.password === form.confirmPassword ? (
                      <>
                        <FiCheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-500">
                          Passwords match
                        </span>
                      </>
                    ) : (
                      <>
                        <FiAlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-xs text-red-500">
                          Passwords do not match
                        </span>
                      </>
                    )}
                  </motion.div>
                )}
              </motion.div>

              {/* Terms Agreement */}
              <motion.div
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-[#907B60] focus:ring-[#907B60]"
                />
                <label className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link to="/terms" className="text-[#907B60] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-[#907B60] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </motion.div>

              {/* Register Button */}
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
                    <FiUserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Create Account</span>
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
                or sign up with
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

                    toast.success("Successfully signed up with Google!");
                    navigate("/");
                  } catch (err) {
                    console.error(err);
                    toast.error("Google sign up failed");
                  }
                }}
                onError={() => {
                  toast.error("Google sign up failed");
                }}
                theme="outline"
                size="large"
                text="continue_with"
                shape="circle"
              />
            </motion.div>

            {/* Sign In Link */}
            <motion.div variants={itemVariants} className="text-center mt-8">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#907B60] font-medium hover:underline inline-flex items-center gap-1 group"
                >
                  Sign in
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
              <span>Secure registration • Encrypted data</span>
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
