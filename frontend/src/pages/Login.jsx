import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login() {

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

      alert("Login success");

      navigate("/home");

    } catch (error) {

      alert("Login failed");

    }

  };

  return (

    <div className="login-container">

      <form onSubmit={handleLogin} className="login-form">

        <h2>Employee Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />

        <button type="submit" className="login-button">
          Login
        </button>

      </form>

    </div>

  );
}

export default Login;