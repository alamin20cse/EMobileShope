import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Helmet } from "react-helmet-async";
import ani1 from '../components/LoginAnimation.json';
import Lottie from "lottie-react";
import Swal from "sweetalert2";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const loginbutton = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/token/`, {
        username,
        password,
      });

      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
         Swal.fire({
                                    icon: "success",
                                    title: "Login success",
                                    text: "Welcome to the platform!",
                                });

   window.location.href = location?.state ? location.state : "/";
  

    } catch (error) {
     Swal.fire({
       icon: "error",
       title: "Login Failed",
       text: "User name or passwor invalid",
       confirmButtonText: "OK"
     });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Helmet>
        <title>Login</title>
      </Helmet>

      {/* Left Side (Animation / Image) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6">
        <Lottie animationData={ani1} className="w-[300px] h-[300px]" />
       
      </div>

      {/* Right Side (Login Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-base-200 p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Button & Register */}
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
      </div>
    </div>
  );
};

export default Login;
