import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../App.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      if (user.role === "ROLE_COLLEGE") navigate("/college/dashboard");
      else if (user.role === "ROLE_FACULTY") navigate("/faculty/dashboard");
      else navigate("/admin/dashboard");
    }
  }, []);

  const handle = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.role === "ROLE_COLLEGE") navigate("/college/dashboard");
      else if (user.role === "ROLE_FACULTY") navigate("/faculty/dashboard");
      else navigate("/admin/dashboard");
      alert("Login Successfull!");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handle}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

          <p>
            New User! <Link to="/register">Register Here</Link>
          </p>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}
