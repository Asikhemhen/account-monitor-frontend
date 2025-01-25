import React, { useState } from "react";

const AddUserPage = () => {
  const [error, setError] = useState("");
  const [okay, setOkay] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    user_rights: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailLowerCase = formData.email.toLowerCase();

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, email: emailLowerCase }),
      });

      if (response.ok) {
        setError("");
        setOkay("User added successfully!");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          user_rights: "",
        });
      } else if (response.status === 409) {
        setError("Email already exists. Please use a different email.");
        setOkay("");
      } else {
        setError("Failed to add user. Please try again.");
        setOkay("");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white px-6 mt-16">
      <div className="bg-white p-8 border rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-extrabold text-blue-900 text-center mb-6">
          Add User
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="first_name"
              className="block text-sm font-bold text-blue-900"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-700 sm:text-sm"
              placeholder="Enter first name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="last_name"
              className="block text-sm font-bold text-blue-900"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-700 sm:text-sm"
              placeholder="Enter last name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-bold text-blue-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-700 sm:text-sm"
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-bold text-blue-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-700 sm:text-sm"
              placeholder="Enter password"
              required
              minLength={8}
              maxLength={20}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="user_rights"
              className="block text-sm font-bold text-blue-900"
            >
              User Rights
            </label>
            <select
              id="user_rights"
              name="user_rights"
              value={formData.user_rights}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-700 sm:text-sm"
              required
            >
              <option value="">Select user right</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          {error && <p className="text-sm text-red-800 py-3">{error}</p>}
          {okay && <p className="text-sm text-green-800 py-3">{okay}</p>}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white p-2 rounded-md hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserPage;
