import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/login", formData);
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      alert("Login successful!");
      navigate("/"); // Change to your dashboard/home
    } catch (err) {
      const detail = err.response?.data?.detail;

      if (typeof detail === "string") {
        setLoginError(detail);
      } else {
        setLoginError("Login failed. Please check your username and password.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-earth-base text-earth-dark p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-earth-card w-full max-w-md p-8 rounded-xl shadow-2xl space-y-5"
      >
        <h2 className="text-3xl font-bold text-center">Login</h2>

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

        {/* Show Password Toggle */}
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

        {/* General Login Error */}
        {loginError && (
          <p className="text-red-500 text-sm text-center">{loginError}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 text-lg font-bold rounded bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
        >
          Login
        </button>
      </form>
    </div>
  );
}
