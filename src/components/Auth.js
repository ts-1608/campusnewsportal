import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("jwtToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <div>
      <h1>Authentication Successful</h1>
    </div>
  );
};

export default Auth;
