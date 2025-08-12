// Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../constants"; 

export default function Logout() {
  const navigate = useNavigate();


  

  useEffect(() => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    window.dispatchEvent(new Event("auth-status-changed")); // trigger after token removal
    navigate("/login"); // redirect after logout
  }, [navigate]);

  return <p>Logging out...</p>;
}
