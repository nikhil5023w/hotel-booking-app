// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

//   const login = (data) => {
//     localStorage.setItem("user", JSON.stringify(data));
//     localStorage.setItem("token", data.token);
//     setUser(data);
//   };

//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, login, logout }}>
//       {" "}
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";
import API from "../services/api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(true);

  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  // 🔴 VERIFY USER WHEN APP LOADS
  const verifyUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await API.get("/auth/me");

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      logout();
    }

    setLoading(false);
  };

  useEffect(() => {
    verifyUser();

    // 🔄 refresh user every 60 seconds
    const interval = setInterval(() => {
      verifyUser();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
