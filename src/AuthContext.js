import React, { createContext, useContext, useState, useEffect } from "react";

// Create Authentication Context
const AuthContext = createContext();

// Provide Authentication Context
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true" || false
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null
  );
  const [firstname, setFirstname] = useState(
    localStorage.getItem("firstname") || ""
  );

  // Save authentication state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("firstname", firstname);
  }, [isAuthenticated, userRole, firstname]);

  const login = (role, firstname) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setFirstname(firstname); // Store firstname on login
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setFirstname(""); // Clear firstname on logout
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("firstname");
    // Redirect to login page after logout
    window.location.href = "/login";
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
