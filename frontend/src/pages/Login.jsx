import "../css/Login.css";
import useLogin from "../scripts/loginScript";

function Login() {

  const {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin
  } = useLogin();

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
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <button className="login-button">
          Login
        </button>

      </form>

    </div>

  );
}

export default Login;