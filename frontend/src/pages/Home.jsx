import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-earth-base flex items-center justify-center p-6">
      <div className="bg-earth-card p-10 rounded-xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-earth-dark mb-4">DrawEngine</h1>
        <p className="text-earth-soft text-md mb-8">
          Your ultimate MTG deck and collection manager.
        </p>

        <div className="flex flex-col space-y-4">
          <Link
            to="/login"
            className="bg-earth-dark hover:bg-earth-soft text-white py-2 rounded transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-earth-soft hover:bg-earth-tan text-white py-2 rounded transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
