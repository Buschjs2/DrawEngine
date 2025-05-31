import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setErrors({ confirm_password: "Passwords do not match." });
      return;
    }

    try {
      await API.post("/register", formData);
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      const detail = err.response?.data?.detail;

      if (typeof detail === "object" && detail.field && detail.message) {
        setErrors({ [detail.field]: detail.message });

        // Prompt if email is already registered
        if (
          detail.field === "email" &&
          detail.message.toLowerCase().includes("already")
        ) {
          const shouldLogin = window.confirm(
            "This email is already registered. Would you like to log in instead?"
          );
          if (shouldLogin) {
            navigate("/login");
          }
        }
      } else {
        alert("Registration failed. Please try again.");
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-earth-base text-earth-dark p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-earth-card w-full max-w-md p-8 rounded-xl shadow-2xl space-y-5"
      >
        <h2 className="text-3xl font-bold text-center">Register</h2>

        {/* Username */}
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type={showPassword ? "text" : "password"}
            name="confirm_password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.confirm_password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirm_password}
            </p>
          )}
        </div>

        {/* Show Password Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword" className="text-sm">
            Show Password
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 text-lg font-bold rounded bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
        >
          Register
        </button>
      </form>
    </div>
  );
}
