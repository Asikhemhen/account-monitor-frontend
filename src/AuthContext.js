import React, { createContext, useContext, useState, useEffect } from "react";

// Create Authentication Context
const AuthContext = createContext();

const BASE_URL = "https://api.tokaipainel.com";

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
  const [data, setData] = useState([]); // Account data
  const [loading, setLoading] = useState(true); // Loading state for account data
  const [error, setError] = useState(null); // Error state for account data

  // Save authentication state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("firstname", firstname);
  }, [isAuthenticated, userRole, firstname]);

  // Fetch account data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/account_info`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const result = await response.json();
          setData(result); // Store account data
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [isAuthenticated]);

  const login = (role, firstname) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setFirstname(firstname); // Store firstname on login
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setFirstname(""); // Clear firstname on logout
    setData([]); // Clear account data on logout
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("firstname");
    // Redirect to login page after logout
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        firstname,
        data,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Authentication Context
export const useAuth = () => useContext(AuthContext);
