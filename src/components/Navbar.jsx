
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/" onClick={closeMenu}>🎟️ TicketApp</Link>
      </div>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
        <NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
        <NavLink to="/tickets" onClick={closeMenu}>Tickets</NavLink>
        <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
        <NavLink to="/signup" onClick={closeMenu}>Signup</NavLink>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
      </div>
    </nav>
  );
}

