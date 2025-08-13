import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  
  const navigate = useNavigate();
 const BASE_URL = import.meta.env.VITE_BASE_URL;
  console.log(BASE_URL);

  const registerButton = async () => {
    if (password !== password2) {
      alert("Passwords do not match. Try again!");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/register/`, {
        username,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert("Registration failed. Try again!");
    }
  };

  return (
   <div className="max-w-md mx-auto my-10 p-8 bg-white shadow-lg rounded-lg">
  <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

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
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">Password</label>
    <input
      onChange={(e) => setPassword(e.target.value)}
      type="password"
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your password"
    />
  </div>

  {/* Confirm Password */}
  <div className="mb-6">
    <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
    <input
      onChange={(e) => setPassword2(e.target.value)}
      type="password"
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Confirm your password"
    />
  </div>

  {/* Buttons */}
  <div className="flex items-center justify-between">
    <button
      onClick={registerButton}
      className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
    >
      Register
    </button>
    <Link to="/login" className="text-blue-500 hover:underline">
      Login Now
    </Link>
  </div>
</div>

  );
};

export default Register;
