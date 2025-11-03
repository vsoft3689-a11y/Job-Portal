import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Left Section - Logo */}
      <div className="nav-left" onClick={() => navigate("/")}>
        <h1 className="logo">JobHire Portal</h1>
      </div>

      {/* Hamburger Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? (
          <span className="close-icon">&times;</span>
        ) : (
          <span className="hamburger">&#9776;</span>
        )}
      </div>

      {/* Center + Right Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <div className="nav-center">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/jobs" onClick={closeMenu}>Jobs</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
          <Link to="/help" onClick={closeMenu}>Help</Link>
        </div>

        <div className="nav-right">
          {user && user.role === "ROLE_COLLEGE" && (
            <Link to="/college/dashboard" onClick={closeMenu}>Dashboard</Link>
          )}
          {user && user.role === "ROLE_FACULTY" && (
            <Link to="/faculty/dashboard" onClick={closeMenu}>Dashboard</Link>
          )}
          {user && user.role === "ROLE_ADMIN" && (
            <Link to="/admin/dashboard" onClick={closeMenu}>Dashboard</Link>
          )}

          {user ? (
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>Login</Link>
              <Link to="/register" onClick={closeMenu}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
