import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
   const BASE_URL = import.meta.env.VITE_BASE_URL;
  // console.log(BASE_URL);

  const loginbutton = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/token/`, {
        username,
        password,
      });

      // Store access and refresh tokens
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

      // Redirect to home page
      window.location.href = "/";
    } catch (error) {
      alert("Username OR Password is invalid. Try again!");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white shadow-lg rounded-lg">
  <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

  {/* Username Field */}
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">Username</label>
    <input
      onChange={(e) => setUsername(e.target.value)}
      type="text"
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your username"
    />
  </div>

  {/* Password Field */}
  <div className="mb-6">
    <label className="block text-gray-700 font-medium mb-2">Password</label>
    <input
      onChange={(e) => setPassword(e.target.value)}
      type="password"
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your password"
    />
  </div>

  {/* Login Button & Register Link */}
  <div className="flex items-center justify-between">
    <button
      onClick={loginbutton}
      className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
    >
      Login
    </button>
    <Link to="/register" className="text-blue-500 hover:underline">
      Register Now
    </Link>
  </div>
</div>

  );
};

export default Login;
