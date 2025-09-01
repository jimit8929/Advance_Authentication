import { getData } from "@/context/userContext";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const { setUser } = getData();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);

      const accessToken = params.get("token");

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);

        try {
          const res = await axios.get("http://localhost:5000/auth/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (res.data.success) {
            setUser(res.data.user);
            navigate("/");
          }
        } catch (error) {
          console.error("Error Fetching user:", error);
        }
      }
    };

    handleAuth();
  },[navigate]);

  return <div>
    <h2>Logging in...</h2>
  </div>;
};

export default AuthSuccess;
