import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const BASE_URL = "https://api.tokaipainel.com";

  useEffect(() => {
    i18n.changeLanguage("pt"); // Set default language to Portuguese
  }, [i18n]); // The empty dependency array ensures this only runs once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace with your actual backend URL
    const apiUrl = `${BASE_URL}/api/login`;

    try {
      // Make a POST request to the backend API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // Parse the response
      const data = await response.json();

      if (response.ok) {
        // Check user rights from the response
        if (data.user.user_rights === "admin") {
          login("admin", data.user.first_name); // Set role to admin
          navigate("/admin/dashboard");
        } else if (data.user.user_rights === "user") {
          login("user", data.user.first_name); // Set role to user
          navigate("/customer/dashboard");
        } else {
          throw new Error(t("Unknown user rights"));
        }

        // console.log("KKKK: ", data.token);
        // Saser dve token or uata to localStorage or context
        // localStorage.setItem("authToken", data.token);
        // Redirect to a protected route (e.g., dashboard)
        //window.location.href = "/dashboard";
      } else {
        // Handle login failure
        setError(`${t(data.error)}`);
        setPassword("");
      }
    } catch (error) {
      // Handle network or unexpected errors
      setError(t("loginPage.Unexpected_error"));
      setPassword("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-5">
      <div className="w-full max-w-sm p-10 bg-white border rounded-lg shadow-lg">
        <h2 className="text-2xl font-extrabold text-center text-blue-950 mb-6">
          {t("loginPage.Login")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-blue-950"
            >
              {t("loginPage.Email")}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-700"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-blue-950"
            >
              {t("loginPage.Password")}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              maxLength={20}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-700"
            />
          </div>
          {error && <p className="text-sm text-red-800">{t(error)}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-800 rounded-lg hover:bg-blue-950 focus:outline-none focus:ring-1 focus:ring-blue-950"
          >
            {t("loginPage.Login")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
