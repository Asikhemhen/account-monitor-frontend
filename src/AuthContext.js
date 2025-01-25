import React, { createContext, useContext, useState } from "react";

// Create Authentication Context
const AuthContext = createContext();

// Provide Authentication Context
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // "admin" or "user"
  const [firstname, setFirstname] = useState(""); // Store firstname

  const login = (role, firstname) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setFirstname(firstname); // Store firstname on login
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setFirstname(""); // Clear firstname on logout
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, firstname, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Authentication Context
export const useAuth = () => useContext(AuthContext);
