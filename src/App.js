import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import "./styles/tailwind.css";
import Layout from "./components/layout";
import AdminDashboard from "./pages/adminDashboard";
import CustomerDashboard from "./pages/customerDashboard";
import LoginPage from "./pages/loginPage";
import AddUserPage from "./pages/addUserPage";
import UsersPage from "./pages/usersPage";
import SettingsPage from "./pages/settingsPage";
import MainTable from "./components/main-table";

// Protected Route to handle role-based access
const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/" />;
  return children;
};

// Default Route component to redirect based on user role
const DefaultRoute = () => {
  const { isAuthenticated, userRole } = useAuth();

  console.log(userRole, isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (userRole === "admin") return <Navigate to="/admin/dashboard" />;
  if (userRole === "user") return <Navigate to="/customer/dashboard" />;
  return <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Routes with Layout */}
          <Route element={<Layout />}>
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-user"
              element={
                <ProtectedRoute role="admin">
                  <AddUserPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute role="admin">
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute role="admin">
                  <SettingsPage />
                </ProtectedRoute>
              }
            />

            {/* Customer Route */}
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute role="user">
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Default Route */}
          <Route path="/" element={<DefaultRoute />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
