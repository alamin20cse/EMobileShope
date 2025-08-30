import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import ani1 from "../components/SignUpAni.json";
import Swal from "sweetalert2";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const registerButton = async () => {
    if (password !== password2) {
      alert("Passwords do not match. Try again!");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("password", password);
    formData.append("confirm_password", password2);
    if (photo) formData.append("photo", photo);

    try {
      const response = await axios.post(`${BASE_URL}/api/register/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201 || response.status === 200) {
       
Swal.fire({
  icon: "success",
  title: "Registration Successful!",
  text: "Please log in.",
  confirmButtonText: "OK"
})
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    
Swal.fire({
  icon: "error",
  title: "Registration Failed",
  text: "Try again!",
  confirmButtonText: "OK"
});
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row-reverse pt-20">
      <Helmet>
        <title>Register</title>
      </Helmet>

      {/* Animation */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-base-200">
        <Lottie animationData={ani1} className="max-w-md" />
      </div>

      {/* Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-base-100 p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

          {/* Username */}
          <label className="block mb-1 font-medium">Enter Username</label>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-3 w-full px-4 py-2 border rounded-lg"
          />

          {/* Email */}
          <label className="block mb-1 font-medium">Enter Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3 w-full px-4 py-2 border rounded-lg"
          />

          {/* First Name */}
          <label className="block mb-1 font-medium">First Name</label>
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mb-3 w-full px-4 py-2 border rounded-lg"
          />

          {/* Last Name */}
          <label className="block mb-1 font-medium">Last Name</label>
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mb-3 w-full px-4 py-2 border rounded-lg"
          />

          {/* Photo */}
          <label className="block mb-1 font-medium">Upload Photo</label>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="mb-3 w-full file-input"
          />

          {/* Password */}
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-3 w-full px-4 py-2 border rounded-lg"
          />

          {/* Confirm Password */}
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className="mb-6 w-full px-4 py-2 border rounded-lg"
          />

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={registerButton}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              Register
            </button>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
