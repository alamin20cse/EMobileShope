import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-3 w-full px-4 py-2 border rounded-lg"
      />

      {/* Email */}
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-3 w-full px-4 py-2 border rounded-lg"
      />

      {/* First Name */}
      <input
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="mb-3 w-full px-4 py-2 border rounded-lg"
      />

      {/* Last Name */}
      <input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="mb-3 w-full px-4 py-2 border rounded-lg"
      />

      {/* Photo */}
      <input
        type="file"
        onChange={(e) => setPhoto(e.target.files[0])}
        className="mb-3 w-full file-input"
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-3 w-full px-4 py-2 border rounded-lg"
      />

      {/* Confirm Password */}
      <input
        type="password"
        placeholder="Confirm Password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        className="mb-6 w-full px-4 py-2 border rounded-lg"
      />

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
  );
};

export default Register;
