import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../App.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_FACULTY");
  const { register, user } = useAuth();
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
      const user = await register(name, email, password, role);
      if (user) {
        alert("Registration Successfull! Please login to continue!");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create an Account</h2>
        <form onSubmit={handle}>
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
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

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="ROLE_FACULTY">Faculty</option>
            <option value="ROLE_COLLEGE">College</option>
          </select>

          <button type="submit">Register</button>
          <p>
            Already registered! <Link to="/login">Login Here</Link>
          </p>

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}
