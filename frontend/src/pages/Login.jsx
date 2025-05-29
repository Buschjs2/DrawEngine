// src/pages/Login.jsx
import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", new URLSearchParams(formData));
      localStorage.setItem("token", res.data.access_token);
      alert("Logged in successfully!");
      navigate("/"); // Redirect to home or dashboard
    } catch (err) {
      alert("Login failed.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form className="w-96 space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold">Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Email"
          required
          className="w-full p-2 text-black"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full p-2 text-black"
          onChange={handleChange}
        />
        <button className="bg-green-600 px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
}
