// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// export default function DashboardSidebar() {
//   const { logout, user } = useContext(AuthContext);

//   return (
//     <div className="bg-gray-100 h-full px-4 pt-20 flex flex-col gap-3">
//       <Link
//         to="/dashboard"
//         className="bg-white p-2 rounded shadow hover:bg-gray-200"
//       >
//         Profile
//       </Link>
//       {user?.role === "admin" && (
//         <Link
//           to="/dashboard/rooms"
//           className="bg-white p-2 rounded shadow hover:bg-gray-200"
//         >
//           Rooms
//         </Link>
//       )}
//       {user?.role !== "admin" && (
//         <Link
//           to="/dashboard/bookings"
//           className="bg-white p-2 rounded shadow hover:bg-gray-200"
//         >
//           My Bookings
//         </Link>
//       )}

//       {user?.role === "admin" && (
//         <Link
//           to="/dashboard/analytics"
//           className="bg-white p-2 rounded shadow hover:bg-gray-200"
//         >
//           Analytics
//         </Link>
//       )}
//       {user?.role === "admin" && (
//         <Link
//           to="/dashboard/guests"
//           className="bg-white p-2 rounded shadow hover:bg-gray-200"
//         >
//           Guest Details
//         </Link>
//       )}

//       <button onClick={logout} className="bg-red-500 text-white p-2 rounded ">
//         Logout
//       </button>
//     </div>
//   );
// }

import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiHome,
  FiCalendar,
  FiBarChart2,
  FiUsers,
  FiLogOut,
  FiHelpCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const iconVariants = {
    hover: {
      scale: 1.1,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  // Navigation items based on user role
  const getNavItems = () => {
    const items = [
      {
        path: "/dashboard",
        icon: FiUser,
        label: "Profile",
        roles: ["admin", "user"],
      },
      {
        path: "/dashboard/rooms",
        icon: FiHome,
        label: "Rooms Management",
        roles: ["admin"],
      },
      {
        path: "/dashboard/bookings",
        icon: FiCalendar,
        label: "My Bookings",
        roles: ["user"],
      },
      {
        path: "/dashboard/analytics",
        icon: FiBarChart2,
        label: "Analytics",
        roles: ["admin"],
      },
      {
        path: "/dashboard/guests",
        icon: FiUsers,
        label: "Guest Management",
        roles: ["admin"],
      },
    ];

    return items.filter((item) => item.roles.includes(user?.role));
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <aside
        className={`relative h-screen ${
          isCollapsed ? "w-[70px]" : "w-[240px]"
        } md:w-[260px] bg-white text-gray-800 shadow-xl border-r border-gray-200 flex flex-col pt-16 transition-all duration-300`}
      >
        {/* Toggle Button (only mobile) */}
        <div className="md:hidden flex justify-end px-3 mb-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all"
          >
            {isCollapsed ? (
              <FiChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <FiChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>{" "}
        {/* Decorative gradient line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#907B60] via-[#b89e84] to-[#907B60]" />
        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {" "}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ x: 5 }}
                  onClick={() => setIsCollapsed(true)}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center ${
                    isCollapsed ? "justify-center md:justify-start" : "gap-4"
                  } px-3 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#907B60] to-[#b89e84] text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
                    />
                  )}

                  <motion.div variants={iconVariants} whileHover="hover">
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <span
                    className={`text-sm font-medium whitespace-nowrap pl-1 md:pl-4 transition-all duration-200 ${
                      isCollapsed ? "hidden md:inline" : "inline"
                    }`}
                  >
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          {/* Help Link */}
          <Link onClick={() => setIsCollapsed(true)} to="/dashboard/help">
            <motion.div
              whileHover={{ x: 5 }}
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "gap-4"
              } px-3 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all`}
            >
              <FiHelpCircle className="w-5 h-5" />
              <span
                className={`text-sm font-medium ${
                  isCollapsed ? "hidden md:inline" : "inline"
                }`}
              >
                Help & Support
              </span>
            </motion.div>
          </Link>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all"
          >
            <FiLogOut className="w-5 h-5" />
            <span
              className={`text-sm font-medium ${
                isCollapsed ? "hidden md:inline" : "inline"
              }`}
            >
              Logout
            </span>
          </motion.button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 max-w-sm mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiLogOut className="w-8 h-8 text-red-500" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                Confirm Logout
              </h3>

              <p className="text-gray-500 text-center mb-6">
                Are you sure you want to logout from your account?
              </p>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                >
                  Logout
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
