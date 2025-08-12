import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
   const BASE_URL = import.meta.env.VITE_BASE_URL;
  console.log(BASE_URL);

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
    <div className="container my-5 p-5">
      <h1>Login</h1>
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
      <p>
        <button onClick={loginbutton} className="btn btn-success my-4">
          Login
        </button>
        <Link to="/register" className="ms-3">
          Register Now
        </Link>
      </p>
    </div>
  );
};

export default Login;
