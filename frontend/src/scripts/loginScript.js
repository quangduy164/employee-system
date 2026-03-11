import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post("/api/login", {
        email,
        password
      });

      const token = res.data.token;

      localStorage.setItem("token", token);

      navigate("/home");

    } catch (error) {

      alert("Login failed");

    }

  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin
  };
}

export default useLogin;