// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext.jsx";

// export default function ProtectedRoute({ children, adminOnly = false }) {
//   const { user } = useContext(AuthContext);

//   // Not logged in
//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   // Admin only check
//   if (adminOnly && user.role !== "admin") {
//     return <Navigate to="/" />;
//   }

//   return children;
// }


import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}