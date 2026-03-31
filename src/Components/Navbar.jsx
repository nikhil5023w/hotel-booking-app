// import { Link, useNavigate } from "react-router-dom";
// import { useContext, useState, useEffect, useRef } from "react";
// import { AuthContext } from "../context/AuthContext.jsx";

// export default function Navbar() {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showNav, setShowNav] = useState(true);
//   const [scrolled, setScrolled] = useState(false);

//   const lastScrollY = useRef(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScroll = window.scrollY;

//       // Show/hide navbar
//       if (currentScroll > lastScrollY.current && currentScroll > 80) {
//         setShowNav(false);
//       } else {
//         setShowNav(true);
//       }

//       // Add background when scrolled
//       if (currentScroll > 50) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }

//       lastScrollY.current = currentScroll;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`
//     fixed top-0 left-0 w-full z-50
//     transition-all duration-300 ease-in-out
//     ${showNav ? "translate-y-0" : "-translate-y-full"}
//     ${scrolled ? "bg-white/85 backdrop-blur-lg shadow-md" : "bg-transparent"}
//   `}
//     >
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="text-2xl font-semibold text-theme-primary tracking-wide"
//         >
//           Wilton manor
//         </Link>

//         {/* Desktop Links */}
//         <div className="hidden md:flex items-center gap-8 font-medium text-theme-primary">
//           <Link to="/" className="hover:text-theme-accent transition">
//             Home
//           </Link>

//           <Link to="/rooms" className="hover:text-theme-accent transition">
//             Rooms
//           </Link>

//           <Link to="/contact" className="hover:text-theme-accent transition">
//             Contact
//           </Link>
//         </div>

//         {/* Desktop Auth */}
//         <div className="hidden md:flex items-center gap-4">
//           {!user && (
//             <>
//               <Link
//                 to="/login"
//                 className="px-4 py-2 rounded-lg hover:bg-theme-bg transition"
//               >
//                 Login
//               </Link>

//               <Link
//                 to="/register"
//                 className="px-5 py-2 rounded-lg bg-theme-accent text-white shadow hover:opacity-90 transition"
//               >
//                 Register
//               </Link>
//             </>
//           )}

//           {user && (
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="w-10 h-10 bg-theme-accent text-white rounded-full flex items-center justify-center shadow hover:scale-105 transition"
//             >
//               👤
//             </button>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="md:hidden text-theme-primary text-2xl"
//         >
//           ☰
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-white border-t border-theme-border px-6 py-4 space-y-4 shadow-soft">
//           <Link to="/" onClick={() => setMenuOpen(false)}>
//             Home
//           </Link>
//           <Link to="/rooms" onClick={() => setMenuOpen(false)}>
//             Rooms
//           </Link>
//           <Link to="/contact" onClick={() => setMenuOpen(false)}>
//             Contact
//           </Link>

//           {!user && (
//             <>
//               <Link to="/login" onClick={() => setMenuOpen(false)}>
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 onClick={() => setMenuOpen(false)}
//                 className="block bg-theme-accent text-white px-4 py-2 rounded-lg text-center"
//               >
//                 Register
//               </Link>
//             </>
//           )}

//           {user && (
//             <button
//               onClick={() => {
//                 navigate("/dashboard");
//                 setMenuOpen(false);
//               }}
//               className="w-full bg-theme-accent text-white px-4 py-2 rounded-lg"
//             >
//               Dashboard
//             </button>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext.jsx";
import {
  FiHome,
  FiCalendar,
  FiPhone,
  FiLogIn,
  FiUserPlus,
  FiMenu,
  FiX,
  FiChevronDown,
  FiSearch,
  FiUser,
} from "react-icons/fi";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const lastScrollY = useRef(0);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Show/hide navbar with threshold
      if (currentScroll > lastScrollY.current && currentScroll > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      // Add background and shadow when scrolled
      if (currentScroll > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Animation variants
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.4 },
    },
  };

  const searchVariants = {
    hidden: { width: 0, opacity: 0, padding: 0 },
    visible: {
      width: "300px",
      opacity: 1,
      padding: "0.5rem 1rem",
      transition: { duration: 0.3 },
    },
  };

  const isActive = (path) => location.pathname === path;

  // Navigation items
  const navItems = [
    { path: "/", label: "Home", icon: FiHome },
    { path: "/rooms", label: "Rooms", icon: FiCalendar },
    { path: "/about", label: "About Us", icon: FiUser },
    { path: "/contact", label: "Contact", icon: FiPhone },
  ];

  return (
    <motion.nav
      ref={navbarRef}
      variants={navbarVariants}
      initial="visible"
      animate={showNav ? "visible" : "hidden"}
      className=" fixed top-0 left-0 right-0 z-50  transition-all duration-300 bg-white/95 backdrop-blur-lg shadow-lg py-3"
    >
      {/* Decorative line at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#907B60] to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="relative group">
            <motion.div
              className="flex items-center gap-3"
              whileHover="hover"
              variants={linkVariants}
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 1 }}
                className="w-12 h-12 bg-gradient-to-br from-[#907B60] to-[#b89e84] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all"
              >
                <span className="text-white text-xl font-serif italic">W</span>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-semibold bg-gradient-to-r from-[#907B60] to-[#b89e84] bg-clip-text text-transparent">
                  Wilton Manor
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    onHoverStart={() => setHoveredItem(item.path)}
                    onHoverEnd={() => setHoveredItem(null)}
                    whileHover="hover"
                    whileTap="tap"
                    variants={linkVariants}
                    className={`
                      relative px-5 py-2.5 rounded-xl flex items-center gap-2
                      transition-all duration-300 group
                      ${
                        active
                          ? "text-[#907B60] bg-[#907B60]/10"
                          : "text-gray-700 hover:text-[#907B60]"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>

                    {/* Active indicator */}
                    {active && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#907B60] rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    {/* Hover effect */}
                    {hoveredItem === item.path && !active && (
                      <motion.div
                        layoutId="navHoverIndicator"
                        className="absolute inset-0 bg-[#907B60]/5 rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {/* Auth Buttons */}
            {!user ? (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2.5 text-gray-700 hover:text-[#907B60] font-medium rounded-xl flex items-center gap-2 transition-colors"
                  >
                    <FiLogIn className="w-4 h-4" />
                    <span>Login</span>
                  </motion.button>
                </Link>

                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#907B60] to-[#b89e84] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <FiUserPlus className="w-4 h-4" />
                    <span>Register</span>
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {/* User Menu */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-3 px-3 py-2 bg-[#907B60]/10 rounded-xl hover:bg-[#907B60]/20 transition-colors group"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-[#907B60] to-[#b89e84] rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold">
                      {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                    </span>
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-medium text-gray-700">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500">Dashboard</p>
                  </div>
                  <FiChevronDown className="w-4 h-4 text-gray-500 group-hover:text-[#907B60]" />
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-12 h-12 bg-[#907B60]/10 rounded-xl flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <FiX className="w-6 h-6 text-[#907B60]" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <FiMenu className="w-6 h-6 text-[#907B60]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search rooms..."
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all"
                />
                <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Mobile Nav Links */}
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                  >
                    <motion.div
                      whileHover={{ x: 5 }}
                      className={`
                        flex items-center gap-4 px-4 py-3 rounded-xl transition-all
                        ${
                          active
                            ? "bg-[#907B60] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}

              {/* Mobile Auth */}
              {!user ? (
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      <FiLogIn className="w-5 h-5" />
                      Login
                    </motion.button>
                  </Link>

                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-[#907B60] to-[#b89e84] text-white font-medium rounded-xl shadow-lg"
                    >
                      <FiUserPlus className="w-5 h-5" />
                      Register
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#907B60] to-[#b89e84] rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {user?.name?.charAt(0) || "U"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 bg-[#907B60] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Go to Dashboard
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
