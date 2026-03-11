import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {

    let newErrors = {};

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {

      const res = await axios.post("/api/login", {
        email,
        password
      });

      const token = res.data.token;

      localStorage.setItem("token", token);

      navigate("/home");

    } catch (error) {
      const message = error.response?.data?.message;

      setErrors({
        password: message || "Login failed"
      });
    }

  };

  return {
    email,
    password,
    errors,
    setEmail,
    setPassword,
    handleLogin
  };
}

export default useLogin;