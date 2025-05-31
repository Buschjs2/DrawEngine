// src/pages/Login.jsx
import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username_or_email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", formData);
      localStorage.setItem("token", res.data.access_token);
      alert("Logged in successfully!");
      navigate("/"); // Redirect to home or dashboard
    } catch (err) {
      alert("Login failed.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-earth-base text-earth-dark p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-earth-card w-full max-w-md p-8 rounded-xl shadow-2xl space-y-5"
      >
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <input
          type="text"
          name="username_or_email"
          placeholder="Username or Email"
          required
          className="w-full p-2 rounded bg-white text-earth-dark focus:outline-none focus:ring-2 focus:ring-earth-soft"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full p-2 rounded bg-white text-earth-dark focus:outline-none focus:ring-2 focus:ring-earth-soft"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-earth-dark hover:bg-earth-soft text-white py-2 px-4 rounded w-full transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
