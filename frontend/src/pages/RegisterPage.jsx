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
    <div className="container my-5 p-5">
      <h1>Register</h1>
      <div className="form-group">
        <label>Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Username"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>
      <div className="form-group">
        <label>Confirm Password</label>
        <input
          onChange={(e) => setPassword2(e.target.value)}
          type="password"
          className="form-control"
          placeholder="Confirm Password"
        />
      </div>
      <p>
        <button onClick={registerButton} className="btn btn-success my-4">
          Register
        </button>
        <Link to="/login" className="ms-3">
          Login Now
        </Link>
      </p>
    </div>
  );
};

export default Register;
