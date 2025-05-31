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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when editing
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
      if (detail?.field && detail?.message) {
        setErrors({ [detail.field]: detail.message });
      } else {
        alert("Registration failed due to a server error.");
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

        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="w-full p-2 rounded bg-white text-earth-dark"
            onChange={handleChange}
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-2 rounded bg-white text-earth-dark"
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-2 rounded bg-white text-earth-dark"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            required
            className="w-full p-2 rounded bg-white text-earth-dark"
            onChange={handleChange}
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-earth-soft hover:bg-earth-tan text-white py-2 px-4 rounded w-full transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
