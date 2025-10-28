
/*
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import Layout from "../components/Layout";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve saved users
    const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("ticketapp_session", JSON.stringify({ email }));
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Layout>
    <main className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-primary">Login</button>
        </form>

        <p>
          Don’t have an account?{" "}
          <Link to="/signup" className="auth-link">
            Sign up
          </Link>
        </p>
      </div>
    </main>
    </Layout>
  );
}
  */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // ✅ update if you placed useAuth elsewhere
import Layout from "../components/Layout";
import "./auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Fake auth flow for demo
    const sessionData = { email };
    localStorage.setItem("ticketapp_session", JSON.stringify(sessionData));
    login(sessionData); // optional: if using context
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="login-container">
        <div className="login-box">
          <h2>Welcome Back 👋</h2>
          <p>Sign in to manage your tickets</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="btn-login">
              Login
            </button>
          </form>

          <p className="signup-link">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
