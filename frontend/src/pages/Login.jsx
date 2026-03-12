import "../css/Login.css";
import useLogin from "../scripts/loginScript";

function Login() {

  const {
    email,
    password,
    errors,
    setEmail,
    setPassword,
    handleLogin
  } = useLogin();

  return (

    <main className="login-container">

      <form onSubmit={handleLogin} className="login-form">

        <h2>Employee Login</h2>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        {errors.email && (
          <p className="error-text">{errors.email}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        {errors.password && (
          <p className="error-text">{errors.password}</p>
        )}

        <button className="login-button">
          Login
        </button>

      </form>

    </main>

  );
}

export default Login;