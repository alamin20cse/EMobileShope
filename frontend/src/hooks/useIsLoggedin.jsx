import { useState, useEffect } from "react";
import { ACCESS_TOKEN } from "../constants"; 


const useIsLoggedIn = () => {
  // Initialize with the current token status
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return !!token;
  });

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const hasToken = !!token;
      console.log("useIsLoggedIn - checking token:", hasToken);
      setIsLoggedIn(hasToken);
    };

    // Listen for storage changes from other tabs/windows
    window.addEventListener("storage", checkAuthStatus);
    
    // Listen for custom auth status change events
    window.addEventListener("auth-status-changed", checkAuthStatus);
    
    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("auth-status-changed", checkAuthStatus);
    };
  }, []);

  return isLoggedIn;
};

export default useIsLoggedIn;
