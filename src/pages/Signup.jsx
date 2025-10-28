/*function Signup() {
  return <h1>Signup Page</h1>;
}

export default Signup;
*/

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";
import Layout from "../components/Layout";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];

    const existingUser = users.find((u) => u.email === formData.email);
    if (existingUser) {
      setError("User already exists. Please log in.");
      return;
    }

    const updatedUsers = [...users, formData];
    localStorage.setItem("ticketapp_users", JSON.stringify(updatedUsers));
    setSuccess("Signup successful! Redirecting...");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <Layout>
    <main className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form onSubmit={handleSignup}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Jane Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-primary">Sign Up</button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </main>
    </Layout>
  );
}
